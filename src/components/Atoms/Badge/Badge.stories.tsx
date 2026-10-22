import Badge from "./Badge.astro";

const meta = {
  title: "Components/Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;

export const Defaults = {
  args: {
    labels: ["they/them", "engineer", "maine", "builder"],
  },
};

export const SpinningPink = {
  args: {
    labels: ["still", "pink", "badge", "demo", "here"],
    backgroundColor: "pink",
    spin: true,
  },
};
