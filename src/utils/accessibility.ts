const FOCUSABLE_SELECTORS = [
  "a[href]",
  "area[href]",
  "button:not(:disabled)",
  "input:not(:disabled):not([type='hidden'])",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  "details > summary:first-of-type",
  "iframe",
  "[contenteditable]:not([contenteditable='false'])",
  "[tabindex]",
].join(",");

export const getFocusableElements = (container: HTMLElement): HTMLElement[] =>
  [...container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)].filter(
    (element) =>
      element.tabIndex >= 0 &&
      !element.closest("[inert]") &&
      element.checkVisibility({visibilityProperty: true}),
  );
