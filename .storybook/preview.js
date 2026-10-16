import "../src/styles/global.css";
import "./fonts.css"; // eslint-disable-line import-x/no-unassigned-import
import "./stories.css"; // eslint-disable-line import-x/no-unassigned-import

// eslint-disable-next-line unicorn/no-top-level-side-effects -- Storybook-astro doesn't ship frontmatter CSS imports to the browser in dev so we have to import them directly
import.meta.glob("../src/components/**/*.module.css", {eager: true});

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(?:background|color)$/iv,
        date: /date$/iv,
      },
    },
    backgrounds: {
      options: {
        page: {name: "Page", value: "var(--page)"},
        gray: {name: "Gray", value: "var(--gray)"},
        ink: {name: "Ink", value: "var(--ink)"},
      },
    },
  },
};
export default preview;
