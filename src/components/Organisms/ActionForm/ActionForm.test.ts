import {experimental_AstroContainer as AstroContainer} from "astro/container";
import {JSDOM} from "jsdom";
import ActionForm from "./ActionForm.astro";

const baseProps = {
  actionName: "newsletter",
};

// Render the ActionForm component and query each part for testing
async function renderActionForm(props = {}) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(ActionForm, {
    props: {...baseProps, ...props},
    slots: {
      default: '<input name="email" type="email" required />',
    },
  });
  const fragment = JSDOM.fragment(html);

  return {
    component: fragment.querySelector<HTMLElement>("action-form"),
    form: fragment.querySelector("form"),
    formError: fragment.querySelector(".error-message"),
    successContainer: fragment.querySelector(".success-container"),
    successMessage: fragment.querySelector(".success-message"),
    turnstileContainer: fragment.querySelector("[data-turnstile-container]"),
  };
}

describe("ActionForm Component", () => {
  test("Renders the form with the slotted fields", async () => {
    const {component, form} = await renderActionForm();

    expect(component).not.toBeNull();
    expect(form?.parentElement).toBe(component);
    expect(form?.querySelector('input[name="email"]')).not.toBeNull();
  });

  test("Passes the action name and success message to the script", async () => {
    const {component} = await renderActionForm({
      successMessage: "You're subscribed!",
    });

    expect(component?.dataset.actionName).toBe("newsletter");
    expect(component?.dataset.successMessage).toBe("You're subscribed!");
  });

  test("Turns off native validation so the script can handle it", async () => {
    const {form} = await renderActionForm();

    expect(form?.hasAttribute("novalidate")).toBe(true);
  });

  test("Passes extra attributes through to the form", async () => {
    const {form} = await renderActionForm({
      "aria-label": "Newsletter sign-up",
      class: "custom-form",
    });

    expect(form?.getAttribute("aria-label")).toBe("Newsletter sign-up");
    expect(form?.classList.contains("custom-form")).toBe(true);
  });

  test("Announces form messages to screen readers", async () => {
    const {formError, successMessage} = await renderActionForm();

    expect(formError?.getAttribute("aria-live")).toBe("polite");
    expect(successMessage?.getAttribute("aria-live")).toBe("polite");
    expect(successMessage?.getAttribute("tabindex")).toBe("-1");
  });

  test("Hides the success message by default", async () => {
    const {successContainer} = await renderActionForm();

    expect(successContainer?.classList.contains("hidden")).toBe(true);
  });

  describe("Turnstile", () => {
    test("Is turned on by default", async () => {
      const {component, turnstileContainer} = await renderActionForm();

      expect(component?.dataset.turnstile).toBe("true");
      expect(turnstileContainer).not.toBeNull();
    });

    test("Can be turned off", async () => {
      const {component, turnstileContainer} = await renderActionForm({
        turnstile: false,
      });

      expect(component?.hasAttribute("data-turnstile")).toBe(false);
      expect(turnstileContainer).toBeNull();
    });
  });
});
