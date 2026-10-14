// Lets tsc and typescript-eslint resolve `.astro` imports in test files
declare module "*.astro" {
  import type {AstroComponentFactory} from "astro/runtime/server/index.js";

  const component: AstroComponentFactory;
  export default component;
}
