// Theme configuration for email templates.
/**
 * Email-safe design values. Mirrors `src/styles/global.css`, but as plain strings.
 */

export const palette = {
  cream: "#fff4ec",
  white: "#fffbf7",
  blush: "#ffe9dc",
  peach: "#ffd3b6",
  apricot: "#ffc3a0",
  salmon: "#ffabab",
  lilac: "#d7b2d8",
  pink: "#ff677d",
  red: "#f83f61",
  gray: "#5e4a4f",
  ink: "#2b1a1e",
} as const;

/**
 * System font stacks. The site's web fonts aren't loaded in emails.
 */
export const font = {
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "ui-monospace, Menlo, Consolas, 'Courier New', monospace",
} as const;

export const space = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  10: "40px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export const radius = {
  sm: "6px",
  md: "18px",
  lg: "24px",
  pill: "999px",
} as const;

export const stroke = {
  bold: "3px",
  fine: "2px",
} as const;

export const contentWidth = 600;
