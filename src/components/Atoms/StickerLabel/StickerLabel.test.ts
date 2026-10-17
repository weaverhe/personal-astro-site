import {experimental_AstroContainer as AstroContainer} from "astro/container";
import {expect, test, describe} from "vitest";
import Text from "../Text/Text.astro";
import StickerLabel from "./StickerLabel.astro";
import styles from "./StickerLabel.module.css";

describe("StickerLabel Component", () => {
  test("Renders a StickerLabel", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(StickerLabel, {});

    expect(result).toContain(styles.sticker);
  });

  test("Renders the children", async () => {
    const container = await AstroContainer.create();

    const innerText = await container.renderToString(Text, {
      props: {
        as: "h2",
      },
      slots: {
        default: "Test Inner Content",
      },
    });

    const result = await container.renderToString(StickerLabel, {
      slots: {
        default: innerText,
      },
    });

    expect(result).toContain("Test Inner Content");
  });

  test("Renders the provided shape SVG", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(StickerLabel, {
      props: {
        shape: "circle",
      },
    });

    expect(result).toContain("<svg");
  });

  test("Applies style props", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(StickerLabel, {
      props: {
        color: "peach",
        corners: "pill",
        tilt: "right",
      },
    });

    expect(result).toContain(styles.peach);
    expect(result).toContain(styles.pill);
    expect(result).toContain(styles.right);
  });
});
