import ArchPortrait from "./ArchPortrait.astro";

const meta = {
  title: "Components/Molecules/ArchPortrait",
  component: ArchPortrait,
  tags: ["autodocs"],
};

export default meta;

export const Defaults = {
  render: () => [
    "<div class='container-450-w padding-50'>",
    {
      component: ArchPortrait,
      props: {
        imageSrc: "/storybook-images/ruth-7.jpeg",
        imageAlt: "Ruth giving tongue",
        badgeLabels: ["Bro", "Ruth", "is", "giving", "tongue"],
      },
    },
    "</div>",
  ],
};

export const PinkRuthHearts = {
  render: () => [
    "<div class='container-450-w padding-50'>",
    {
      component: ArchPortrait,
      props: {
        imageSrc: "/storybook-images/ruth-8.jpeg",
        imageAlt: "Ruth giving tongue",
        badgeLabels: ["Ruth", "has", "a", "heart", "tongue"],
        stickerShape: "heart",
        stickerColor: "pink",
        badgeColor: "blush",
        frameColor: "salmon",
      },
    },
    "</div>",
  ],
};
