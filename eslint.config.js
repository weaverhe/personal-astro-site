import {defineConfig} from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigXo from "eslint-config-xo";

// eslint-disable-next-line unicorn/no-top-level-side-effects -- Eslint recommended setup!
export default defineConfig([
  {ignores: ["dist/", ".astro/", "node_modules/"]},
  ...eslintConfigXo({
    browser: true,
    space: true,
    // Turn off formatting rules; Prettier handles formatting
    prettier: "compat",
  }),
  eslintPluginAstro.configs.recommended,
  eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    files: ["src/components/**/*.{js,jsx,ts,tsx,astro}"],
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "pascalCase",
          directoryRoots: ["src/components"],
        },
      ],
    },
  },
]);
