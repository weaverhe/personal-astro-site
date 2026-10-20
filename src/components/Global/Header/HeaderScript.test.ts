// @vitest-environment jsdom
import {headerMenu} from "./HeaderScript.ts";

HTMLElement.prototype.checkVisibility = vi.fn(function (this: HTMLElement) {
  return this.style.display !== "none";
});

const getElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing test element: ${selector}`);
  }

  return element;
};

const pressKey = (key: string, options: KeyboardEventInit = {}) => {
  const event = new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  });
  (document.activeElement ?? document).dispatchEvent(event);
  return event;
};

describe("headerMenu", () => {
  let header: HTMLElement;
  let toggle: HTMLButtonElement;
  let main: HTMLElement;
  let logo: HTMLAnchorElement;
  let lastLink: HTMLAnchorElement;
  let breakpointChange: EventListener | undefined;

  beforeAll(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: false,
        addEventListener(_type: string, listener: EventListener) {
          breakpointChange = listener;
        },
        removeEventListener: vi.fn(),
      })),
    );

    document.body.innerHTML = `
      <header>
        <a href="/" id="logo">heather weaver</a>
        <button id="menu-toggle" aria-expanded="false">Menu</button>
        <nav id="nav">
          <a href="/content">Content</a>
          <a href="/contact" id="last-link">Contact</a>
        </nav>
      </header>
      <main></main>
    `;

    header = getElement("header");
    toggle = getElement("#menu-toggle");
    main = getElement("main");
    logo = getElement("#logo");
    lastLink = getElement("#last-link");

    headerMenu(header);
  });

  beforeEach(() => {
    toggle.setAttribute("aria-expanded", "false");
    main.removeAttribute("inert");
    header.classList.remove("no-transition");
    toggle.focus();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Toggle button", () => {
    test("should toggle aria-expanded and inert attributes", () => {
      toggle.click();

      expect(toggle.getAttribute("aria-expanded")).toBe("true");
      expect(main.hasAttribute("inert")).toBe(true);
    });

    test("Closes the menu on a second click", () => {
      toggle.click();
      toggle.click();

      expect(toggle.getAttribute("aria-expanded")).toBe("false");
      expect(main.hasAttribute("inert")).toBe(false);
    });
  });

  describe("Escape key", () => {
    test("Closes the menu and returns focus to the toggle", () => {
      toggle.click();
      lastLink.focus();

      pressKey("Escape");

      expect(toggle.getAttribute("aria-expanded")).toBe("false");
      expect(main.hasAttribute("inert")).toBe(false);
      expect(document.activeElement).toBe(toggle);
    });

    test("Does nothing while the menu is closed", () => {
      lastLink.focus();

      pressKey("Escape");

      expect(toggle.getAttribute("aria-expanded")).toBe("false");
      expect(document.activeElement).toBe(lastLink);
    });
  });

  describe("Focus trap", () => {
    test("Tab on the last element wraps to the first", () => {
      toggle.click();
      lastLink.focus();

      const event = pressKey("Tab");

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(logo);
    });

    test("Shift+Tab on the first element wraps to the last", () => {
      toggle.click();
      logo.focus();

      const event = pressKey("Tab", {shiftKey: true});

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(lastLink);
    });

    test("Tab in the middle of the menu is left alone", () => {
      toggle.click();

      const event = pressKey("Tab");

      expect(event.defaultPrevented).toBe(false);
    });

    test("Tab is not trapped while the menu is closed", () => {
      lastLink.focus();

      const event = pressKey("Tab");

      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe("Breakpoint change", () => {
    test("Closes the menu and suppresses transitions for two frames", () => {
      vi.useFakeTimers({toFake: ["requestAnimationFrame"]});
      toggle.click();

      breakpointChange?.(new Event("change"));

      expect(toggle.getAttribute("aria-expanded")).toBe("false");
      expect(header.classList.contains("no-transition")).toBe(true);

      vi.advanceTimersToNextFrame();
      expect(header.classList.contains("no-transition")).toBe(true);

      vi.advanceTimersToNextFrame();
      expect(header.classList.contains("no-transition")).toBe(false);
    });
  });
});
