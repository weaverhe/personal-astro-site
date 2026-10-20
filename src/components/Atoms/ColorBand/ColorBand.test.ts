import {experimental_AstroContainer as AstroContainer} from "astro/container";
import ColorBand from "./ColorBand.astro";
import styles from "./ColorBand.module.css";

describe("ColorBand Component", () => {
  test("Renders a ColorBand", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ColorBand, {});

    expect(result).toContain(styles.band);
  });

  test("Hides content from screen readers", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(ColorBand, {});

    expect(result).toContain('aria-hidden="true"');
  });
});
