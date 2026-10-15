import Text from "./Text.astro";

const meta = {
  title: "Components/Atoms/Text",
  component: Text,
  tags: ["autodocs"],
};

export default meta;

export const Defaults = {
  args: {
    slots: {
      default: "Default settings",
    },
  },
};

export const BigHero = {
  args: {
    variant: "display",
    as: "h1",
    slots: {
      default: "This Is A Big Hero Headline",
    },
  },
};

export const Bold = {
  args: {
    variant: "body",
    as: "p",
    bold: true,
    slots: {
      default: "Bold text",
    },
  },
};

export const Colorful = {
  args: {
    as: "h3",
    color: "peach",
    slots: {
      default: "Colorful text",
    },
  },
  globals: {
    backgrounds: {
      value: "ink",
    },
  },
};

export const LinkVariants = {
  render: () => [
    {
      component: Text,
      props: {
        as: "a",
        variant: "link",
        href: "#",
      },
      slots: {default: "Internal link"},
    },
    "<br />",
    "<br />",
    "<br />",
    {
      component: Text,
      props: {
        as: "a",
        variant: "external-link",
        href: "https://www.hweaver.com",
      },
      slots: {default: "External link"},
    },
  ],
};

export const Highlight = {
  args: {
    highlight: "peach",
    as: "span",
    slots: {
      default: "Highlighted text",
    },
  },
};

export const CodeVariations = {
  render: () => [
    {
      component: Text,
      props: {
        as: "h2",
        variant: "h5",
      },
      slots: {
        default: "Inline Code",
      },
    },
    {
      component: Text,
      props: {
        as: "code",
      },
      slots: {
        default: "getInnerText()",
      },
    },
    {
      component: Text,
      props: {
        as: "h2",
        variant: "h5",
      },
      slots: {
        default: "Code Block",
      },
    },
    "<pre>",
    {
      component: Text,
      props: {
        as: "code",
      },
      slots: {
        default: "Code block content",
      },
    },
    "</pre>",
  ],
};

export const KitchenSink = {
  args: {
    as: "p",
    variant: "body-small",
    uppercase: true,
    bold: true,
    italic: true,
    color: "gray",
    textDecoration: "underline",
    slots: {
      default: "Kitchen sink text",
    },
  },
};

export const TypographyScale = {
  render: () => [
    {
      component: Text,
      props: {
        as: "h1",
        variant: "display",
      },
      slots: {
        default: "Display Heading",
      },
    },
    {
      component: Text,
      props: {
        as: "h1",
        variant: "h1",
      },
      slots: {
        default: "H1 Heading",
      },
    },
    {
      component: Text,
      props: {
        as: "h2",
        variant: "h2",
      },
      slots: {
        default: "H2 Heading",
      },
    },
    {
      component: Text,
      props: {
        as: "h3",
        variant: "h3",
      },
      slots: {
        default: "H3 Heading",
      },
    },
    {
      component: Text,
      props: {
        as: "h4",
        variant: "h4",
      },
      slots: {
        default: "H4 Heading",
      },
    },
    {
      component: Text,
      props: {
        as: "h5",
        variant: "h5",
      },
      slots: {
        default: "H5 Heading",
      },
    },
    {
      component: Text,
      props: {
        as: "h6",
      },
      slots: {
        default: "H6 Heading",
      },
    },
    {
      component: Text,
      props: {
        variant: "lede",
      },
      slots: {
        default: "Lede text",
      },
    },
    {
      component: Text,
      props: {
        variant: "body",
      },
      slots: {
        default: "Body text",
      },
    },
    {
      component: Text,
      props: {
        variant: "body-small",
      },
      slots: {
        default: "Body small text",
      },
    },
  ],
};
