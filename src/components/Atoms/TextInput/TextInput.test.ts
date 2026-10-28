import {experimental_AstroContainer as AstroContainer} from "astro/container";
import TextInput from "./TextInput.astro";
import styles from "./TextInput.module.css";

describe("TextInput Component", () => {
  test("Renders an input", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(TextInput, {});

    expect(result).toContain(styles.input);
    expect(result).toContain("<input");
    expect(result).toContain('type="text"');
  });

  test("Applies correct type", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(TextInput, {
      props: {
        type: "email",
      },
    });

    expect(result).toContain('type="email"');
  });
});
