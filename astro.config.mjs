// @ts-check
import {defineConfig, fontProviders} from "astro/config";
import mdx from "@astrojs/mdx";

// https://astro.build/config
// eslint-disable-next-line unicorn/no-top-level-side-effects -- Astro recommended setup!
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Archivo",
      cssVariable: "--font-display",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/headings.woff2"],
            weight: "800 900",
            style: "normal",
            display: "swap",
            stretch: "110% 125%",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Atkinson Hyperlegible",
      cssVariable: "--font-body",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/body.ttf"],
            weight: "400",
            style: "normal",
            display: "swap",
          },
          {
            src: ["./src/assets/fonts/body-italic.ttf"],
            weight: "400",
            style: "italic",
            display: "swap",
          },
          {
            src: ["./src/assets/fonts/body-bold.ttf"],
            weight: "700",
            style: "normal",
            display: "swap",
          },
          {
            src: ["./src/assets/fonts/body-bold-italic.ttf"],
            weight: "700",
            style: "italic",
            display: "swap",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/mono.ttf"],
            weight: "100 800",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
  ],

  integrations: [mdx()],
});
