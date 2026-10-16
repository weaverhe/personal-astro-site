import Text from "../Text/Text.astro";
import Shape from "./Shape.astro";
import {colors, shapes, sizes} from "./Shape.constants.ts";

const meta = {
  title: "Components/Atoms/Shape",
  component: Shape,
  tags: ["autodocs"],
};

export default meta;

export const Defaults = {
  args: {
    shape: "circle",
  },
};

const captionedShape = (props: Record<string, string>, caption: string) => [
  `<figure class="figure">`,
  {
    component: Shape,
    props,
  },
  {
    component: Text,
    props: {
      as: "figcaption",
      variant: "caption",
    },
    slots: {default: caption},
  },
  "</figure>",
];

export const AllShapes = {
  render: () => [
    `<div class="grid">`,
    ...shapes.flatMap((shape, index) =>
      captionedShape({shape, color: colors[index % colors.length]}, shape),
    ),
    "</div>",
  ],
};

export const AllSizes = {
  render: () => [
    `<div class="row">`,
    ...sizes.flatMap((size) =>
      captionedShape({shape: "heart", color: "pink", size}, size),
    ),
    "</div>",
  ],
};

export const AllColors = {
  render: () => [
    `<div class="grid">`,
    ...colors.flatMap((color) =>
      captionedShape({shape: "fancy-flower", color}, color),
    ),
    "</div>",
  ],
};

export const RotatedJasmine = {
  args: {
    shape: "jasmine",
    rotation: 155,
    size: "medium",
  },
};

export const SpinningSunflower = {
  args: {
    shape: "sunflower",
    animation: "slow-spin",
    color: "peach",
  },
};
