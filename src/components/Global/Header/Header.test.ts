import {experimental_AstroContainer as AstroContainer} from "astro/container";
import {expect, test, describe} from "vitest";
import {JSDOM} from "jsdom";
import Header from "./Header.astro";

const renderHeaderAtPath = async (path: string) => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Header, {
    request: new Request(`http://localhost${path}`),
  });

  return new JSDOM(result).window.document;
};

const currentHrefs = (document: Document) =>
  [...document.querySelectorAll("a[aria-current='page']")].map((a) =>
    a.getAttribute("href"),
  );

describe("Header", () => {
  test("The header renders", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {});
    expect(result).toContain("heather weaver");
  });

  describe("Active state rendering", () => {
    test.each([
      ["/", ["/"]],
      ["/content", ["/content"]],
      ["/content/my-post", ["/content"]],
      ["/contentious", []],
      ["/about", ["/about"]],
    ])("marks the right link as current at %s", async (path, expected) => {
      expect(currentHrefs(await renderHeaderAtPath(path))).toEqual(expected);
    });
  });

  test("The toggle has the correct aria attributes", async () => {
    const document = await renderHeaderAtPath("/");
    const toggle = document.querySelector("button[aria-expanded]")!;
    expect(toggle).toBeTruthy();
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.getAttribute("aria-controls")).toBe("nav");
    expect(toggle.getAttribute("aria-label")).toBe("Menu");
  });

  test("#nav exists", async () => {
    const document = await renderHeaderAtPath("/");
    const nav = document.querySelector("#nav");
    expect(nav).toBeTruthy();
  });

  test("The nav renders the correct links in the correct order", async () => {
    const document = await renderHeaderAtPath("/");
    const nav = document.querySelector("#nav");
    const links = [...nav!.querySelectorAll("a")].map((a) =>
      a.getAttribute("href"),
    );
    expect(links).toEqual([
      "/",
      "/content",
      "/workbench",
      "/about",
      "/contact",
    ]);
  });

  test("The logo exists and links to the home page", async () => {
    const document = await renderHeaderAtPath("/");
    const logo = document.querySelector("#logo");
    expect(logo).toBeTruthy();
    expect(logo!.getAttribute("href")).toBe("/");
  });
});
