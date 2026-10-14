// eslint-disable-next-line import-x/no-anonymous-default-export -- Recommended setup from Astro Storybook project
export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: {
    name: "@storybook-astro/framework",
    options: {},
  },
  features: {
    sidebarOnboardingChecklist: false,
  },
  addons: ["@storybook/addon-docs"],
};
