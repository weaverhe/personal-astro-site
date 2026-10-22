import {experimental_AstroContainer as AstroContainer} from "astro/container";
import Badge from "./Badge.astro";
import styles from "./Badge.module.css";

describe("Badge", () => {
  test("The badge renders with the label text", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Badge, {
      props: {
        labels: ["label1", "label2", "label3", "label4"],
      },
    });
    expect(result).toContain("label1");
    expect(result).toContain("label2");
    expect(result).toContain("label3");
    expect(result).toContain("label4");
  });

  test("The default badge renders with the correct classes", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Badge, {
      props: {
        labels: ["label1", "label2", "label3", "label4"],
      },
    });

    expect(result).toContain(styles.badge);
    expect(result).toContain(styles.blush);
    expect(result).toContain(styles.badgeContent);
  });

  test("Style props apply the correct classes", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Badge, {
      props: {
        labels: ["label1", "label2", "label3", "label4"],
        backgroundColor: "pink",
        spin: true,
      },
    });
    expect(result).toContain(styles.badge);
    expect(result).toContain(styles.pink);
    expect(result).toContain(styles.spin);
  });
});
