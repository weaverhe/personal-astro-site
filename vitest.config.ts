// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- Astro recommended setup, adds `test` to the Vite config type
/// <reference types="vitest/config" />
import {getViteConfig} from "astro/config";

// eslint-disable-next-line unicorn/no-top-level-side-effects -- Astro recommended setup
export default getViteConfig({
  test: {},
});
