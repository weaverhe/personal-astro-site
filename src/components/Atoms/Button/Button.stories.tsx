import Text from "../Text/Text.astro";
import Button from "./Button.astro";

const meta = {
  title: "Components/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

export const Defaults = {
  args: {
    slots: {
      default: "Click me (default)",
    },
  },
};

export const ColorVariations = {
  render: () => [
    {
      component: Text,
      props: {
        as: "h2",
        variant: "h5",
      },
      slots: {default: "Cream"},
    },
    {
      component: Button,
      props: {
        color: "cream",
      },
      slots: {default: "Click me"},
    },
    "<br /><br />",
    {
      component: Text,
      props: {
        as: "h2",
        variant: "h5",
      },
      slots: {default: "Pink"},
    },
    {
      component: Button,
      props: {
        color: "pink",
      },
      slots: {default: "Click me"},
    },
    "<br /><br />",
    {
      component: Text,
      props: {
        as: "h2",
        variant: "h5",
      },
      slots: {default: "Ink"},
    },
    {
      component: Button,
      props: {
        color: "ink",
      },
      slots: {default: "Click me"},
    },
  ],
};

export const Large = {
  args: {
    size: "large",
    slots: {
      default: "Click me (default)",
    },
  },
};

export const Disabled = {
  args: {
    disabled: true,
    slots: {
      default: "Can't click me",
    },
  },
};

export const Glyphs = {
  render: () => [
    {
      component: Text,
      props: {
        as: "h2",
        variant: "h5",
      },
      slots: {default: "Right Arrow"},
    },
    {
      component: Button,
      props: {
        color: "cream",
        glyph: "right-arrow",
      },
      slots: {default: "Click me"},
    },
    "<br /><br />",
    {
      component: Text,
      props: {
        as: "h2",
        variant: "h5",
      },
      slots: {default: "External Link"},
    },
    {
      component: Button,
      props: {
        color: "pink",
        as: "a",
        href: "https://www.hweaver.com",
        glyph: "external-link",
      },
      slots: {default: "Click me"},
    },
  ],
};
