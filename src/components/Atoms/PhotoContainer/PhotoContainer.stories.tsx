import PhotoContainer from "./PhotoContainer.astro";

const meta = {
  title: "Components/Atoms/PhotoContainer",
  component: PhotoContainer,
  tags: ["autodocs"],
};

export default meta;

export const Defaults = {
  args: {
    image: "/storybook-images/ruth-1.jpeg",
    alt: "Ruth 1",
  },
};

export const StylizedFrame = {
  args: {
    image: "/storybook-images/ruth-2.jpeg",
    alt: "Ruth 2",
    frameColor: "lilac",
    shadow: true,
    style: "max-width: 300px",
  },
};

const shapes = ["arch", "circle", "square", "rounded-corners"];
const colorsForShapes = ["lilac", "pink", "blush", "none"];

export const AllShapes = {
  render: () => [
    "<div class='spaced-flex-wrap'>",
    ...shapes.map((shape, i) => ({
      component: PhotoContainer,
      props: {
        image: `/storybook-images/ruth-${i + 3}.jpeg`,
        alt: `Ruth ${i + 3}`,
        shape,
        style: "max-width: 300px",
        frameColor: colorsForShapes[i % colorsForShapes.length],
      },
    })),
    "</div>",
  ],
};
