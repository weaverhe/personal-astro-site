export const shapes = [
  "aster",
  "bell-flower",
  "blob",
  "bubble-h",
  "bubble-x",
  "bullseye",
  "burst",
  "circle",
  "confetti",
  "daisy",
  "diamond",
  "egg",
  "fancy-flower",
  "flower-frame",
  "geranium",
  "half-circles",
  "heart",
  "hexagon",
  "infinity",
  "jasmine",
  "moon",
  "octagon",
  "oval",
  "parallelogram",
  "pentagon",
  "petal",
  "pill",
  "pinwheel",
  "rectangle",
  "runner",
  "square",
  "star-14",
  "star-5",
  "star-8",
  "sunflower",
  "triangle",
  "triangles",
  "tulip",
  "waves",
  "whirl",
] as const;

export const colors = [
  "cream",
  "white",
  "blush",
  "peach",
  "apricot",
  "salmon",
  "lilac",
  "pink",
] as const;

export const sizes = [
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large",
] as const;

export const animations = ["slow-spin", "blink"] as const;

export type ShapeName = (typeof shapes)[number];
export type ShapeColor = (typeof colors)[number];
export type ShapeSize = (typeof sizes)[number];
export type ShapeAnimation = (typeof animations)[number];
