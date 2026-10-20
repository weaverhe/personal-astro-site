import {experimental_AstroContainer as AstroContainer} from "astro/container";
import Shape from "./Shape.astro";
import {shapes} from "./Shape.constants.ts";
import styles from "./Shape.module.css";

describe("Shape Component", () => {
  test.each(shapes)("Renders an SVG for %s", async (shape) => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Shape, {
      props: {shape},
    });

    expect(result).toContain("<svg");
  });

  test("Hides the shape from assistive technology", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Shape, {
      props: {shape: "heart"},
    });

    expect(result).toContain('aria-hidden="true"');
  });

  test("Sets the rotation as a CSS variable", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Shape, {
      props: {shape: "heart", rotation: 45},
    });

    expect(result).toMatch(/--rotation:\s*45deg/v);
    expect(result).not.toContain("rotation=");
  });

  test("Defaults to cream and medium", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Shape, {
      props: {shape: "heart"},
    });

    expect(result).toContain(styles.cream);
    expect(result).toContain(styles.medium);
  });
});
