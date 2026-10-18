import {paletteColors} from "../../../constants/colors.ts";
import Chip from "./Chip.astro";

const meta = {
  title: "Components/Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
};

export default meta;

export const Defaults = {
  args: {
    label: "Default Chip",
  },
};

export const BlinkingDot = {
  args: {
    label: "Blinking Dot",
    dotColor: "pink",
    dotBlink: true,
  },
};

const tags = [
  "Job",
  "Side Project",
  "Tool",
  "Experiment",
  "Tutorial",
  "Article",
  "Talk",
  "Course",
  "Review",
  "WordPress",
  "WCAG",
  "Animation",
];
const borderTypes = ["solid", "dashed", "dotted"];

export const TagCloud = {
  render: () => [
    "<div class='spaced-flex-wrap'>",
    ...tags.map((tag) => {
      const color =
        paletteColors[Math.floor(Math.random() * paletteColors.length)];
      const border =
        borderTypes[Math.floor(Math.random() * borderTypes.length)];

      return {
        component: Chip,
        props: {
          label: tag,
          backgroundColor: color,
          borderStyle: border,
        },
      };
    }),
    "</div>",
  ],
};

export const Pagination = {
  render: () => [
    "<div class='spaced-flex-wrap'>",
    ...Array.from({length: 5}, (x, i) => ({
      component: Chip,
      props: {
        label: `${i + 1}`,
        backgroundColor: i === 2 ? "ink" : "cream",
        as: "button",
        shape: "circle",
      },
    })),
    {
      component: Chip,
      props: {
        label: "→",
        shape: "circle",
        as: "button",
      },
    },
    "</div>",
  ],
};

const filters = [
  {
    label: "All",
    count: 8,
    backgroundColor: "ink",
  },
  {
    label: "Job",
    count: 3,
    dotColor: "lilac",
  },
  {
    label: "Side Projects",
    count: 2,
    dotColor: "peach",
  },
  {
    label: "Tools",
    count: 3,
    dotColor: "salmon",
  },
];

export const Filters = {
  render: () => [
    "<div class='spaced-flex-wrap'>",
    ...filters.map((filter) => ({
      component: Chip,
      props: {
        backgroundColor: "cream",
        as: "button",
        shadow: true,
        ...filter,
      },
    })),
    "</div>",
  ],
};
