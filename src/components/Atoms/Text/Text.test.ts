import {experimental_AstroContainer as AstroContainer} from "astro/container";
import {expect, test, describe} from "vitest";
import Text from "./Text.astro";
import styles from "./Text.module.css";

describe("Text component", () => {
  test("Renders child content", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Text, {
      slots: {
        default: "Text content",
      },
    });

    expect(result).toContain("Text content");
  });

  test("Renders as the correct element", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Text, {
      props: {
        as: "h1",
      },
      slots: {
        default: "Heading",
      },
    });

    expect(result).toContain("<h1");
  });

  test("Applies the correct default variant when no variant is supplied", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Text, {
      slots: {
        default: "Body variant",
      },
    });

    const headingResult = await container.renderToString(Text, {
      props: {
        as: "h1",
      },
      slots: {
        default: "Heading variant",
      },
    });

    expect(result).toContain(styles.body);
    expect(headingResult).toContain(styles.h1);
  });

  test("Text styling props toggle their classes", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Text, {
      props: {
        bold: true,
        textDecoration: "underline",
        uppercase: true,
        italic: true,
      },
      slots: {
        default: "Highly decorated text",
      },
    });

    expect(result).toContain(styles.bold);
    expect(result).toContain(styles.underline);
    expect(result).toContain(styles.uppercase);
    expect(result).toContain(styles.italic);
  });

  test("The correct highlight classes are applied", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Text, {
      props: {
        highlight: "peach",
      },
      slots: {
        default: "Highlighted text",
      },
    });

    expect(result).toContain(styles.highlight);
    expect(result).toContain(styles["highlight-peach"]);
  });

  test("External links render arrow", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Text, {
      props: {
        href: "https://example.com",
        as: "a",
        variant: "external-link",
      },
      slots: {
        default: "External link",
      },
    });

    expect(result).toContain("External link");
    expect(result).toContain(styles["external-link-arrow"]);
  });
});
