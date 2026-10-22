import {experimental_AstroContainer as AstroContainer} from "astro/container";
import PhotoContainer from "./PhotoContainer.astro";
import styles from "./PhotoContainer.module.css";

describe("PhotoContainer", () => {
  test("The image renders with src and alt", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PhotoContainer, {
      props: {
        image: "/storybook-images/ruth-1.jpeg",
        alt: "Ruth 1",
      },
    });
    expect(result).toContain('src="/storybook-images/ruth-1.jpeg"');
    expect(result).toContain('alt="Ruth 1"');
  });

  test("The default photocontainer applies the correct classes", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PhotoContainer, {
      props: {
        image: "/storybook-images/ruth-1.jpeg",
        alt: "Ruth 1",
      },
    });
    expect(result).toContain(styles.container);
    expect(result).toContain(styles["frame-none"]);
    expect(result).toContain(styles.border);
    expect(result).toContain(styles.square);
  });

  test("Style props apply the correct classes", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(PhotoContainer, {
      props: {
        image: "/storybook-images/ruth-1.jpeg",
        alt: "Ruth 1",
        shape: "circle",
        frameColor: "lilac",
        shadow: true,
      },
    });
    expect(result).toContain(styles["frame-lilac"]);
    expect(result).toContain(styles.shadow);
    expect(result).toContain(styles.circle);
  });
});
