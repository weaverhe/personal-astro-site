// @vitest-environment jsdom
import {ActionForm} from "./ActionFormScript.ts";

const {newsletter, loadTurnstileScript} = vi.hoisted(() => ({
  newsletter: vi.fn<(input: FormData) => Promise<unknown>>(),
  loadTurnstileScript: vi.fn<() => Promise<void>>(),
}));

vi.mock("astro:actions", () => ({
  actions: {newsletter},
  isInputError: (error: unknown) =>
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    error.type === "AstroActionInputError",
}));

vi.mock("astro:env/client", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention -- Matches the astro:env variable name
  TURNSTILE_SITE_KEY: "test-site-key",
}));

vi.mock("../../../utils/turnstile.ts", () => ({loadTurnstileScript}));

const turnstileStub = {
  render: vi.fn((container: HTMLElement) => {
    container.innerHTML =
      '<input type="hidden" name="cf-turnstile-response" value="token" />';
    return "widget-id";
  }),
  getResponse: vi.fn(() => "token"),
  reset: vi.fn(),
  remove: vi.fn(),
};

const successResult = {data: {success: true}, error: undefined};

const inputErrorResult = (fields: Record<string, string[]>) => ({
  data: undefined,
  error: {type: "AstroActionInputError", issues: [], fields},
});

const actionErrorResult = (message: string) => ({
  data: undefined,
  error: {type: "AstroActionError", code: "FORBIDDEN", message},
});

const getElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing test element: ${selector}`);
  }

  return element;
};

const blurField = (field: HTMLElement) => {
  field.dispatchEvent(new FocusEvent("focusout", {bubbles: true}));
};

const typeInto = (field: HTMLInputElement, value: string) => {
  field.value = value;
  field.dispatchEvent(new Event("input", {bubbles: true}));
};

type RenderOptions = {
  turnstile?: boolean;
  waitForTurnstile?: boolean;
};

// Render markup matching ActionForm + FormField output and query each part for testing
async function renderForm({
  turnstile = true,
  waitForTurnstile = turnstile,
}: RenderOptions = {}) {
  document.body.innerHTML = `
    <action-form
      data-action-name="newsletter"
      ${turnstile ? 'data-turnstile="true"' : ""}
    >
      <div class="success-container hidden">
        <p class="success-message" aria-live="polite" tabindex="-1"></p>
      </div>
      <form novalidate>
        <p class="error-message" aria-live="polite"></p>
        <div>
          <label for="name">Name*</label>
          <input
            id="name"
            name="name"
            type="text"
            data-touched="false"
            aria-describedby="name-error"
            required
          />
          <p id="name-error"></p>
        </div>
        <div>
          <label for="email">Email*</label>
          <input
            id="email"
            name="email"
            type="email"
            data-touched="false"
            aria-describedby="email-error"
            required
          />
          <p id="email-error"></p>
        </div>
        ${turnstile ? "<div><div data-turnstile-container></div></div>" : ""}
        <button type="submit">Subscribe</button>
      </form>
    </action-form>
  `;

  if (waitForTurnstile) {
    await vi.waitFor(() => {
      expect(turnstileStub.render).toHaveBeenCalled();
    });
  }

  return {
    component: getElement<ActionForm>("action-form"),
    form: getElement<HTMLFormElement>("form"),
    name: getElement<HTMLInputElement>("#name"),
    nameError: getElement("#name-error"),
    email: getElement<HTMLInputElement>("#email"),
    emailError: getElement("#email-error"),
    formError: getElement(".error-message"),
    successContainer: getElement(".success-container"),
    successMessage: getElement(".success-message"),
  };
}

const fillValidFields = (name: HTMLInputElement, email: HTMLInputElement) => {
  typeInto(name, "Heather");
  typeInto(email, "heather@example.com");
};

describe("ActionForm", () => {
  beforeAll(() => {
    vi.stubGlobal("turnstile", turnstileStub);

    if (!customElements.get("action-form")) {
      customElements.define("action-form", ActionForm);
    }
  });

  beforeEach(() => {
    newsletter.mockResolvedValue(successResult);
    loadTurnstileScript.mockResolvedValue();
    turnstileStub.getResponse.mockReturnValue("token");
  });

  afterEach(() => {
    document.body.replaceChildren();
    vi.clearAllMocks();
  });

  describe("Client validation", () => {
    test("Shows an error when a field loses focus", async () => {
      const {name, nameError} = await renderForm();

      blurField(name);

      expect(name.dataset.touched).toBe("true");
      expect(nameError.textContent).not.toBe("");
    });

    test("Doesn't validate while typing until the field has lost focus once", async () => {
      const {name, nameError} = await renderForm();

      typeInto(name, "");

      expect(name.dataset.touched).toBe("false");
      expect(nameError.textContent).toBe("");
    });

    test("Clears the error while typing once the field is touched", async () => {
      const {name, nameError} = await renderForm();

      blurField(name);
      typeInto(name, "Heather");

      expect(nameError.textContent).toBe("");
    });
  });

  describe("Submitting", () => {
    test("Doesn't call the action when a field is invalid", async () => {
      const {form, name, nameError, emailError} = await renderForm();

      form.requestSubmit();

      expect(newsletter).not.toHaveBeenCalled();
      expect(nameError.textContent).not.toBe("");
      expect(emailError.textContent).not.toBe("");
      expect(document.activeElement).toBe(name);
    });

    test("Marks every field as touched so typing clears errors", async () => {
      const {form, name, email, emailError} = await renderForm();

      form.requestSubmit();
      typeInto(email, "heather@example.com");

      expect(name.dataset.touched).toBe("true");
      expect(emailError.textContent).toBe("");
    });

    test("Blocks the submit without a Turnstile token", async () => {
      turnstileStub.getResponse.mockReturnValue("");
      const {form, name, email, formError} = await renderForm();
      fillValidFields(name, email);

      form.requestSubmit();

      expect(newsletter).not.toHaveBeenCalled();
      expect(formError.textContent).toBe(
        "Please complete the verification and try again.",
      );
    });

    test("Sends the form data to the named action", async () => {
      const {form, name, email} = await renderForm();
      fillValidFields(name, email);

      form.requestSubmit();

      await vi.waitFor(() => {
        expect(newsletter).toHaveBeenCalledOnce();
      });
      const formData = newsletter.mock.lastCall?.[0];
      expect(formData?.get("name")).toBe("Heather");
      expect(formData?.get("email")).toBe("heather@example.com");
      expect(formData?.get("cf-turnstile-response")).toBe("token");
    });

    test("Ignores a second submit while the first is in flight", async () => {
      const {promise, resolve} = Promise.withResolvers<unknown>();
      newsletter.mockReturnValueOnce(promise);
      const {form, name, email} = await renderForm();
      fillValidFields(name, email);

      form.requestSubmit();
      form.requestSubmit();
      resolve(successResult);

      await vi.waitFor(() => {
        expect(turnstileStub.reset).toHaveBeenCalled();
      });
      expect(newsletter).toHaveBeenCalledOnce();
    });

    test("Shows the success message and hides the form", async () => {
      const {form, name, email, successContainer, successMessage} =
        await renderForm();
      fillValidFields(name, email);

      form.requestSubmit();

      await vi.waitFor(() => {
        expect(successMessage.textContent).toBe(
          "Thanks! Your submission was received.",
        );
      });
      expect(successContainer.classList.contains("hidden")).toBe(false);
      expect(form.classList.contains("hidden")).toBe(true);
      expect(document.activeElement).toBe(successMessage);
    });

    test("Uses the custom success message when one is set", async () => {
      const {component, form, name, email, successMessage} = await renderForm();
      component.dataset.successMessage = "You're subscribed!";
      fillValidFields(name, email);

      form.requestSubmit();

      await vi.waitFor(() => {
        expect(successMessage.textContent).toBe("You're subscribed!");
      });
    });

    test("Resets the fields after a successful submit", async () => {
      const {form, name, email} = await renderForm();
      fillValidFields(name, email);

      form.requestSubmit();

      await vi.waitFor(() => {
        expect(name.value).toBe("");
      });
      expect(email.value).toBe("");
      expect(name.dataset.touched).toBe("false");
      expect(email.dataset.touched).toBe("false");
    });
  });

  describe("Server errors", () => {
    test("Shows input errors on the matching field", async () => {
      newsletter.mockResolvedValue(
        inputErrorResult({name: ["Please enter your name."]}),
      );
      const {form, name, email, nameError} = await renderForm();
      fillValidFields(name, email);

      form.requestSubmit();

      await vi.waitFor(() => {
        expect(nameError.textContent).toBe("Please enter your name.");
      });
      expect(name.validity.customError).toBe(true);
    });

    test("Clears a server error once the user types", async () => {
      newsletter.mockResolvedValue(
        inputErrorResult({name: ["Please enter your name."]}),
      );
      const {form, name, email, nameError} = await renderForm();
      fillValidFields(name, email);
      form.requestSubmit();
      await vi.waitFor(() => {
        expect(nameError.textContent).toBe("Please enter your name.");
      });

      typeInto(name, "Heather Weaver");

      expect(nameError.textContent).toBe("");
      expect(name.validity.valid).toBe(true);
    });

    test("Falls back to the form message for fields without an input", async () => {
      newsletter.mockResolvedValue(
        inputErrorResult({
          "cf-turnstile-response": ["Please complete the verification."],
        }),
      );
      const {form, name, email, formError} = await renderForm();
      fillValidFields(name, email);

      form.requestSubmit();

      await vi.waitFor(() => {
        expect(formError.textContent).toBe("Please complete the verification.");
      });
    });

    test("Shows the message from other action errors", async () => {
      newsletter.mockResolvedValue(
        actionErrorResult("Verification failed, please try again."),
      );
      const {form, name, email, formError} = await renderForm();
      fillValidFields(name, email);

      form.requestSubmit();

      await vi.waitFor(() => {
        expect(formError.textContent).toBe(
          "Verification failed, please try again.",
        );
      });
    });

    test("Shows a generic message when the request fails", async () => {
      newsletter.mockRejectedValue(new Error("Network error"));
      const {form, name, email, formError} = await renderForm();
      fillValidFields(name, email);

      form.requestSubmit();

      await vi.waitFor(() => {
        expect(formError.textContent).toBe(
          "An unexpected error occurred. Please try again.",
        );
      });
    });
  });

  describe("Turnstile", () => {
    test("Renders the widget with the site key", async () => {
      await renderForm();

      expect(turnstileStub.render).toHaveBeenCalledWith(
        getElement("[data-turnstile-container]"),
        {sitekey: "test-site-key"},
      );
    });

    test.each([
      ["a success", successResult],
      ["a server error", actionErrorResult("Something went wrong.")],
    ])("Resets the widget after %s", async (_label, result) => {
      newsletter.mockResolvedValue(result);
      const {form, name, email} = await renderForm();
      fillValidFields(name, email);

      form.requestSubmit();

      await vi.waitFor(() => {
        expect(turnstileStub.reset).toHaveBeenCalledWith("widget-id");
      });
    });

    test("Removes the widget when the form leaves the page", async () => {
      const {component} = await renderForm();

      component.remove();

      expect(turnstileStub.remove).toHaveBeenCalledWith("widget-id");
    });

    test("Shows an error when the script fails to load", async () => {
      loadTurnstileScript.mockRejectedValue(new Error("Blocked"));
      const {formError} = await renderForm({waitForTurnstile: false});

      await vi.waitFor(() => {
        expect(formError.textContent).toBe(
          "There was an issue loading the form, please refresh and try again.",
        );
      });
      expect(turnstileStub.render).not.toHaveBeenCalled();
    });

    test("Is skipped entirely when turned off", async () => {
      const {form, name, email} = await renderForm({turnstile: false});
      fillValidFields(name, email);

      form.requestSubmit();

      await vi.waitFor(() => {
        expect(newsletter).toHaveBeenCalledOnce();
      });
      expect(loadTurnstileScript).not.toHaveBeenCalled();
      expect(turnstileStub.render).not.toHaveBeenCalled();
      expect(turnstileStub.reset).not.toHaveBeenCalled();
    });
  });
});
