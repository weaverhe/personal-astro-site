// @vitest-environment jsdom

import {expect, describe, test, vi} from "vitest";
import {getFocusableElements} from "./accessibility.ts";

HTMLElement.prototype.checkVisibility = vi.fn(function (this: HTMLElement) {
  return this.style.display !== "none";
});

describe("getFocusableElements", () => {
  test("returns only focusable elements", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button>Button</button>
      <input type="text" />
      <a href="#">Link</a>
      <div tabindex="0">Focusable Div</div>
      <div>Non-focusable Div</div>
    `;

    const focusableElements = getFocusableElements(container);
    expect(focusableElements).toHaveLength(4);
  });

  test("returns only visible focusable elements", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button style="display:none">Hidden Button</button>
      <input type="text" />
      <a href="#">Link</a>
      <div tabindex="0">Focusable Div</div>
    `;

    const focusableElements = getFocusableElements(container);
    expect(focusableElements).toHaveLength(3);
  });

  test("does not return elements with inert attribute", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button inert>Inert Button</button>
      <input type="text" />
      <a href="#">Link</a>
      <div tabindex="0">Focusable Div</div>
    `;

    const focusableElements = getFocusableElements(container);
    expect(focusableElements).toHaveLength(3);
  });

  test("does not return elements from a parent with inert attribute", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div inert>
        <button>Button</button>
        <input type="text" />
      </div>
      <a href="#">Link</a>
      <div tabindex="0">Focusable Div</div>
    `;

    const focusableElements = getFocusableElements(container);
    expect(focusableElements).toHaveLength(2);
  });
});
