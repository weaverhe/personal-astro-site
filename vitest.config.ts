// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- Astro recommended setup, adds `test` to the Vite config type
/// <reference types="vitest/config" />
import {getViteConfig} from "astro/config";
import {configDefaults} from "vitest/config";

// eslint-disable-next-line unicorn/no-top-level-side-effects -- Astro recommended setup
export default getViteConfig({
  test: {
    globals: true,
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          exclude: [...configDefaults.exclude, "tests/routes/**"],
        },
      },
      {
        extends: false,
        test: {
          name: "routes",
          globals: true,
          include: ["tests/routes/**/*.test.ts"],
        },
      },
    ],
  },
});
