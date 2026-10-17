import Text from "../Text/Text.astro";
import StickerLabel from "./StickerLabel.astro";

const meta = {
  title: "Components/Atoms/StickerLabel",
  component: StickerLabel,
  tags: ["autodocs"],
};

export default meta;

export const Defaults = {
  args: {
    slots: {
      default: {
        component: Text,
        props: {
          as: "h2",
        },
        slots: {
          default: "Sticker Label Default",
        },
      },
    },
  },
};

export const AllSizes = {
  render: () => [
    {
      component: StickerLabel,
      props: {
        size: "small",
        color: "pink",
      },
      slots: {
        default: {
          component: Text,
          props: {
            as: "h4",
          },
          slots: {
            default: "Sticker Label Small",
          },
        },
      },
    },
    "<br /><br />",
    {
      component: StickerLabel,
      props: {
        size: "medium",
        color: "peach",
      },
      slots: {
        default: {
          component: Text,
          props: {
            as: "h2",
          },
          slots: {
            default: "Sticker Label Medium",
          },
        },
      },
    },
    "<br /><br />",
    {
      component: StickerLabel,
      props: {
        size: "large",
        color: "lilac",
      },
      slots: {
        default: {
          component: Text,
          props: {
            as: "h1",
          },
          slots: {
            default: "Sticker Label Large",
          },
        },
      },
    },
  ],
};

export const PillWithSpinningFlower = {
  render: () => [
    "<br />",
    {
      component: StickerLabel,
      props: {
        color: "blush",
        corners: "pill",
        shape: "fancy-flower",
        shapeColor: "salmon",
        shapeAnimation: "slow-spin",
      },
      slots: {
        default: {
          component: Text,
          props: {
            as: "h2",
          },
          slots: {
            default: "Pill with Spinning Flower",
          },
        },
      },
    },
  ],
};
