import {getFocusableElements} from "../../../utils/accessibility.ts";

export const headerMenu = (header: HTMLElement) => {
  const menuToggle: HTMLButtonElement = document.querySelector("#menu-toggle")!;
  const main = document.querySelector("main");
  const desktopQuery = globalThis.matchMedia("(width >= 1200px)");

  const isMenuOpen = () => menuToggle?.getAttribute("aria-expanded") === "true";

  const setOpen = (isOpen: boolean) => {
    menuToggle?.setAttribute("aria-expanded", String(isOpen));
    main?.toggleAttribute("inert", isOpen);
  };

  menuToggle?.addEventListener("click", () => {
    setOpen(!isMenuOpen());
  });

  // A11y - trap focus + make escape close the menu
  document.addEventListener("keydown", (event_) => {
    if (!isMenuOpen()) {
      return;
    }

    if (event_.key === "Escape") {
      setOpen(false);
      menuToggle?.focus();
      return;
    }

    if (event_.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements(header);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements.at(-1);

    if (event_.shiftKey && document.activeElement === firstFocusable) {
      event_.preventDefault();
      lastFocusable?.focus();
    } else if (!event_.shiftKey && document.activeElement === lastFocusable) {
      event_.preventDefault();
      firstFocusable?.focus();
    }
  });

  // Prevent animation jitters when we change from mobile to desktop menu
  desktopQuery.addEventListener("change", () => {
    header?.classList.add("no-transition");
    setOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        header?.classList.remove("no-transition");
      });
    });
  });
};
