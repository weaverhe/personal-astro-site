import {fileURLToPath} from "node:url";

// eslint-disable-next-line import-x/no-anonymous-default-export -- Recommended setup from Astro Storybook project
export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: [
    "../public",
    {
      from: "./images",
      to: "/storybook-images",
    },
  ],
  framework: {
    name: "@storybook-astro/framework",
    options: {},
  },
  features: {
    sidebarOnboardingChecklist: false,
  },
  addons: ["@storybook/addon-docs"],
  async viteFinal(config, ...args) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: [
          ...(args[0].resolve?.alias ?? []),
          {
            find: "astro:actions",
            replacement: fileURLToPath(
              new URL("mocks/astro-actions.js", import.meta.url),
            ),
          },
          {
            find: "astro:env/client",
            replacement: fileURLToPath(
              new URL("mocks/astro-client-env.js", import.meta.url),
            ),
          },
        ],
      },
    };
  },
};
