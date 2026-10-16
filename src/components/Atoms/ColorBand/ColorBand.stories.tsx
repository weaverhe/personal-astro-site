import ColorBand from "./ColorBand.astro";

const meta = {
  title: "Components/Atoms/ColorBand",
  component: ColorBand,
  tags: ["autodocs"],
};

export default meta;

export const Defaults = {
  args: {},
};

export const LargeBordered = {
  args: {
    height: "large",
    borderBottom: true,
    borderTop: true,
  },
};
