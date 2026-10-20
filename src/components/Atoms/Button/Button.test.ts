import {experimental_AstroContainer as AstroContainer} from "astro/container";
import Button from "./Button.astro";
import styles from "./Button.module.css";

describe("Button Component", () => {
  test("Renders as the correct element", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        as: "input",
      },
      slots: {
        default: "Click me",
      },
    });

    expect(result).toContain("<input");
  });

  test("Renders child content", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      slots: {
        default: "Click me",
      },
    });

    expect(result).toContain("Click me");
  });

  test("Applies the color styles", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        color: "pink",
      },
      slots: {
        default: "Click me",
      },
    });

    expect(result).toContain(styles.pink);
  });

  test("Defaults to cream", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      slots: {
        default: "Click me",
      },
    });

    expect(result).toContain(styles.white);
  });

  test("Handles the disabled state", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: "Don't click me",
      },
    });

    expect(result).toContain("disabled");
  });

  test("Applies the size styles", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        size: "large",
      },
      slots: {
        default: "Click me",
      },
    });

    expect(result).toContain(styles.large);
  });

  test("Renders external glyph and message", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        glyph: "external-link",
      },
      slots: {
        default: "Click me",
      },
    });

    expect(result).toContain(styles["external-link"]);
    expect(result).toContain(styles["external-link-label"]);
    expect(result).toContain('aria-hidden="true"');
  });
});
