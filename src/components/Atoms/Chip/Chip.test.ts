import {experimental_AstroContainer as AstroContainer} from "astro/container";
import Chip from "./Chip.astro";
import styles from "./Chip.module.css";

describe("Chip Component", () => {
  test("Renders a Chip", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Chip, {
      props: {
        label: "Basic Chip",
      },
    });

    expect(result).toContain("<span");
    expect(result).toContain(styles.chip);
  });

  test("Renders as the correct element", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Chip, {
      props: {
        label: "Basic Chip",
        as: "a",
      },
    });

    expect(result).toContain("<a");
  });

  test("Contains the label text", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Chip, {
      props: {
        label: "Chip Label",
      },
    });

    expect(result).toContain("Chip Label");
  });

  test("Applies style props", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Chip, {
      props: {
        label: "Styled Chip",
        backgroundColor: "pink",
        borderStyle: "dotted",
        shape: "circle",
      },
    });

    expect(result).toContain(styles.pink);
    expect(result).toContain(styles.dotted);
    expect(result).toContain(styles.circle);
  });

  test("Displays a colored dot", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Chip, {
      props: {
        label: "Dot Chip",
        dotColor: "salmon",
      },
    });

    expect(result).toContain(styles.dot);
    expect(result).toContain(styles.salmon);
  });

  test("Displays a count", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Chip, {
      props: {
        label: "Count Chip",
        count: 5,
      },
    });

    expect(result).toContain(styles.count);
    expect(result).toContain("5");
  });
});
