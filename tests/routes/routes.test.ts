import {readdirSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {preview} from "astro";

const root = new URL("../../", import.meta.url);

const staticRoutes = ["/", "/about", "/contact", "/content", "/workbench"];

// Grab the first entry from each collection to ensure dynamic routes work
const collectionRoutes = ["content", "workbench"].map((collection) => {
  const first = readdirSync(
    new URL(`src/collections/${collection}`, root),
  ).find((file) => file.endsWith(".mdx"));

  return `/${collection}/${first?.replace(/\.mdx$/v, "")}`;
});

let server: Awaited<ReturnType<typeof preview>>;

beforeAll(async () => {
  server = await preview({root: fileURLToPath(root), logLevel: "error"});
});

afterAll(async () => {
  await server.stop();
});

describe("routes", () => {
  it.each([...staticRoutes, ...collectionRoutes])(
    "%s returns 200",
    async (route) => {
      const response = await fetch(`http://localhost:${server.port}${route}`);
      expect(response.status).toBe(200);
    },
  );
});
