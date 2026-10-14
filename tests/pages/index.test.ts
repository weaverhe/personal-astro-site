import {experimental_AstroContainer as AstroContainer} from "astro/container";
import {expect, test} from "vitest";
import Index from "../../src/pages/index.astro";

test("index page renders the site heading", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Index);

  expect(result).toContain("<h1>Heather's Site</h1>");
});
