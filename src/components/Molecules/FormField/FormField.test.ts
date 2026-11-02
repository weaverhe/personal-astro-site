import {experimental_AstroContainer as AstroContainer} from "astro/container";
import FormField from "./FormField.astro";

describe("FormField Component", () => {
  test("Renders a form field", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(FormField, {
      props: {id: "test", label: "Test", name: "test", inputType: "TextInput"},
    });

    expect(result).toContain("Test");
    expect(result).toContain("<label");
    expect(result).toContain("<input");
  });
});
