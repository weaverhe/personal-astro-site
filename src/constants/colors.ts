/**
 * Mirrors the color variables in src/styles/global.css.
 */
export const lightColors = [
  "cream",
  "white",
  "blush",
  "peach",
  "apricot",
  "salmon",
  "lilac",
  "pink",
] as const;

export const darkColors = ["gray", "ink"] as const;

export const paletteColors = [...lightColors, ...darkColors] as const;

export const aliasColors = [
  "text",
  "secondary-text",
  "accent",
  "active",
  "marks",
  "panels",
  "brand",
  "brand-tint",
  "raised",
  "page",
] as const;

export type LightColor = (typeof lightColors)[number];
export type DarkColor = (typeof darkColors)[number];
export type PaletteColor = (typeof paletteColors)[number];
export type AliasColor = (typeof aliasColors)[number];

export const isDarkColor = (color: PaletteColor): color is DarkColor =>
  (darkColors as readonly string[]).includes(color);
