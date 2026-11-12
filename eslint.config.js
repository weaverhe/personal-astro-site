import {defineConfig} from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigXo from "eslint-config-xo";

// eslint-disable-next-line unicorn/no-top-level-side-effects -- Eslint recommended setup!
export default defineConfig([
  {
    ignores: [
      "dist/",
      ".astro/",
      "node_modules/",
      "**/*.css",
      "wrangler.jsonc",
      "worker-configuration.d.ts",
    ],
  },
  ...eslintConfigXo({
    browser: true,
    space: true,
    // Turn off formatting rules; Prettier handles formatting
    prettier: "compat",
  }),
  eslintPluginAstro.configs.recommended,
  eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    files: [
      "src/components/**/*.{js,jsx,ts,tsx,astro}",
      "src/emails/components/**/*.{js,jsx,ts,tsx,astro}",
      "src/emails/layouts/**/*.{js,jsx,ts,tsx,astro}",
    ],
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "pascalCase",
          directoryRoots: [
            "src/components",
            "src/emails/components",
            "src/emails/layouts",
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,astro}"],
    rules: {
      // Prefer standard asterisk-prefixed JSDoc over XO's asterisk-free style
      "jsdoc/require-asterisk-prefix": ["error", "always"],
      "unicorn/no-asterisk-prefix-in-documentation-comments": "off",
      "jsdoc/check-alignment": "error",
      "@stylistic/curly-newline": [
        "error",
        {
          minElements: 1,
        },
      ],
    },
  },
  {
    files: ["package.json"],
    rules: {
      "package-json/no-orphan-types": [
        "error",
        {ignore: ["@types/cloudflare-turnstile"]},
      ],
    },
  },
  {
    files: ["src/pages/**/*.{astro,ts,js}"],
    rules: {
      "unicorn/consistent-boolean-name": [
        "error",
        {
          prefixes: {
            had: true,
            does: true,
          },
          ignore: ["^prerender$"],
        },
      ],
    },
  },
]);
