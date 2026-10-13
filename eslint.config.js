import {defineConfig} from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigXo from "eslint-config-xo";

// eslint-disable-next-line unicorn/no-top-level-side-effects -- Eslint recommended setup!
export default defineConfig([
  {ignores: ["dist/", ".astro/", "node_modules/"]},
  ...eslintConfigXo({
    browser: true,
    space: true,
  }),
  eslintPluginAstro.configs.recommended,
  eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,astro}"],
    rules: {
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      "@stylistic/quotes": ["error", "double"],
    },
  },
]);
