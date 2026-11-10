import {TURNSTILE_SITE_KEY} from "astro:env/client";
import {actions, isInputError, type SafeResult} from "astro:actions";
import {loadTurnstileScript} from "../../../utils/turnstile.ts";

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type FormAction = (
  input: FormData,
) => Promise<SafeResult<Record<string, unknown>, unknown>>;

const isFormControl = (target: unknown): target is FormControl =>
  target instanceof HTMLInputElement ||
  target instanceof HTMLSelectElement ||
  target instanceof HTMLTextAreaElement;

const renderControlError = (control: FormControl) => {
  const errorId = control.getAttribute("aria-describedby");
  const errorField =
    errorId === null ? null : document.querySelector(`#${errorId}`);

  if (errorField) {
    errorField.textContent = control.validationMessage;
  }
};

const validateControl = (control: FormControl) => {
  control.setCustomValidity("");
  renderControlError(control);

  return control.checkValidity();
};

const setFormError = (form: HTMLFormElement, message: string) => {
  const formError = form.querySelector<HTMLParagraphElement>(".error-message");
  if (formError) {
    formError.textContent = message;
  }
};

const setFormSuccess = (root: HTMLElement, message: string) => {
  const formSuccess =
    root.querySelector<HTMLParagraphElement>(".success-message");
  const formSuccessContainer =
    root.querySelector<HTMLDivElement>(".success-container");
  if (!formSuccess || !formSuccessContainer) {
    return;
  }

  formSuccess.textContent = message;
  if (message === "") {
    return;
  }

  formSuccessContainer.classList.remove("hidden");
  formSuccess.focus();
};

const getFormAction = (name: string | undefined) =>
  name === undefined
    ? undefined
    : (actions as Record<string, FormAction>)[name];

export class ActionForm extends HTMLElement {
  #controller?: AbortController;
  #widgetId?: string;
  #isSubmitting = false;

  readonly #mountTurnstile = async (
    form: HTMLFormElement,
    signal: AbortSignal,
  ) => {
    try {
      await loadTurnstileScript();

      if (signal.aborted) {
        return;
      }

      const container = form.querySelector<HTMLDivElement>(
        "[data-turnstile-container]",
      );

      if (!container) {
        return;
      }

      const id = turnstile.render(container, {sitekey: TURNSTILE_SITE_KEY});
      if (typeof id === "string") {
        this.#widgetId = id;
      }
    } catch {
      setFormError(
        form,
        "There was an issue loading the form, please refresh and try again.",
      );
    }
  };

  readonly #onBlur = (event_: FocusEvent) => {
    const control = event_.target;

    if (!isFormControl(control)) {
      return;
    }

    control.dataset.touched = "true";
    validateControl(control);
  };

  readonly #onInput = (event_: Event) => {
    const control = event_.target;

    if (!isFormControl(control) || control.dataset.touched !== "true") {
      return;
    }

    validateControl(control);
  };

  readonly #onSubmit = (event_: Event) => {
    event_.preventDefault();
    const form = this.querySelector("form");

    if (form && !this.#isSubmitting) {
      void this.#submit(form);
    }
  };

  #showServerErrors(
    form: HTMLFormElement,
    fields: Record<string, string[] | undefined>,
  ) {
    for (const [name, messages] of Object.entries(fields)) {
      const message = messages?.[0];
      if (message === undefined) {
        continue;
      }

      const control = form.elements.namedItem(name);

      if (isFormControl(control) && control.willValidate) {
        control.dataset.touched = "true";
        control.setCustomValidity(message);
        renderControlError(control);
      } else {
        setFormError(form, message);
      }
    }
  }

  #hasTurnstileToken() {
    if (this.dataset.turnstile === undefined) {
      return true;
    }

    return (
      this.#widgetId !== undefined &&
      Boolean(turnstile.getResponse(this.#widgetId))
    );
  }

  async #submit(form: HTMLFormElement) {
    setFormError(form, "");
    setFormSuccess(this, "");

    const controls = [
      ...form.querySelectorAll<FormControl>("input, select, textarea"),
    ].filter((control) => control.willValidate);

    const results = controls.map((control) => {
      control.dataset.touched = "true";
      return validateControl(control);
    });

    if (!results.every(Boolean)) {
      controls.find((control) => !control.validity.valid)?.focus();
      return;
    }

    if (!this.#hasTurnstileToken()) {
      setFormError(form, "Please complete the verification and try again.");
      return;
    }

    const action = getFormAction(this.dataset.actionName);
    if (!action) {
      setFormError(form, "This form isn't set up correctly.");
      return;
    }

    this.#isSubmitting = true;

    try {
      const {error} = await action(new FormData(form));

      if (isInputError(error)) {
        this.#showServerErrors(form, error.fields);
        return;
      }

      if (error) {
        setFormError(form, error.message);
        return;
      }

      form.reset();

      for (const control of controls) {
        control.dataset.touched = "false";
      }

      const formMessage =
        this.dataset.successMessage ?? "Thanks! Your submission was received.";

      setFormSuccess(this, formMessage);
      form.classList.add("hidden");
    } catch {
      setFormError(form, "An unexpected error occurred. Please try again.");
    } finally {
      this.#isSubmitting = false;

      if (this.#widgetId !== undefined) {
        turnstile.reset(this.#widgetId);
      }
    }
  }

  connectedCallback() {
    const form = this.querySelector("form");
    if (!form) {
      return;
    }

    this.#controller = new AbortController();
    const {signal} = this.#controller;

    form.addEventListener(
      "focusout",
      (event_) => {
        this.#onBlur(event_);
      },
      {
        signal,
      },
    );
    form.addEventListener(
      "input",
      (event_) => {
        this.#onInput(event_);
      },
      {signal},
    );
    form.addEventListener(
      "submit",
      (event_) => {
        this.#onSubmit(event_);
      },
      {
        signal,
      },
    );

    if (this.dataset.turnstile !== undefined) {
      void this.#mountTurnstile(form, signal);
    }
  }

  disconnectedCallback() {
    this.#controller?.abort();

    if (this.#widgetId !== undefined) {
      turnstile.remove(this.#widgetId);
    }
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/naming-convention -- We need this specific format for global type merging
  interface HTMLElementTagNameMap {
    "action-form": ActionForm;
  }
}
