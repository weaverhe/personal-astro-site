import {fillTemplate, token} from "./tokens.ts";

describe("token", () => {
  test("returns the token string for a given key", () => {
    expect(token("name")).toBe("%%name%%");
    expect(token("confirmUrl")).toBe("%%confirmUrl%%");
  });
});

describe("fillTemplate", () => {
  test("replaces tokens with values", () => {
    const template = "Hello %%name%%, please confirm at %%confirmUrl%%.";
    const values = {name: "Alice", confirmUrl: "https://example.com"};
    const result = fillTemplate("confirm", template, values);
    expect(result).toBe("Hello Alice, please confirm at https://example.com.");
  });

  test("errors when a required token is missing", () => {
    const template = "Hello %%name%%, please confirm at %%confirmUrl%%.";
    const values = {name: "Alice"};
    // @ts-expect-error: confirmUrl is missing from values to test error behavior
    expect(() => fillTemplate("confirm", template, values)).toThrow(
      "Missing value for token: confirmUrl",
    );
  });

  test("replaces multiple occurrences of the same token", () => {
    const template =
      "Hello %%name%%, %%name%% please confirm at %%confirmUrl%%.";
    const values = {name: "Alice", confirmUrl: "https://example.com"};
    const result = fillTemplate("confirm", template, values);
    expect(result).toBe(
      "Hello Alice, Alice please confirm at https://example.com.",
    );
  });

  test("escapes HTML characters in values", () => {
    const template = "Hello %%name%%, please confirm at %%confirmUrl%%.";
    const values = {
      name: "<Alice>",
      confirmUrl: "https://example.com?param=<value>",
    };
    const result = fillTemplate("confirm", template, values);
    expect(result).toBe(
      "Hello &lt;Alice&gt;, please confirm at https://example.com?param=&lt;value&gt;.",
    );
  });

  test("Escapes & in URLs inside attributes", () => {
    const template = '<a href="%%confirmUrl%%">Confirm</a>';
    const values = {
      name: "Alice",
      confirmUrl: "https://example.com?param=1&other=2",
    };
    const result = fillTemplate("confirm", template, values);
    expect(result).toBe(
      '<a href="https://example.com?param=1&amp;other=2">Confirm</a>',
    );
  });

  test("does not replace tokens that appear inside values", () => {
    const template = "Hello %%name%%, please confirm at %%confirmUrl%%.";
    const values = {name: "Alice %%name%%", confirmUrl: "https://example.com"};
    const result = fillTemplate("confirm", template, values);
    expect(result).toBe(
      "Hello Alice %%name%%, please confirm at https://example.com.",
    );
  });
});
