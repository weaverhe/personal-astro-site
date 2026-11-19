import {darkTheme, stroke} from "./theme.ts";

export const darkClass = {
  page: "page--dark",
  surface: "surface--dark",
  text: "text--dark",
  mutedText: "mutedText--dark",
  link: "link--dark",
  buttonBackground: "buttonBackground--dark",
  buttonText: "buttonText--dark",
  buttonBorder: "buttonBorder--dark",
  headerBackground: "headerBackground--dark",
  headerText: "headerText--dark",
} as const;

const rules = [
  [darkClass.page, `background-color: ${darkTheme.page} !important;`],
  [darkClass.surface, `background-color: ${darkTheme.surface} !important;`],
  [darkClass.text, `color: ${darkTheme.text} !important;`],
  [darkClass.mutedText, `color: ${darkTheme.mutedText} !important;`],
  [darkClass.link, `color: ${darkTheme.link} !important;`],
  [
    darkClass.buttonBackground,
    `background-color: ${darkTheme.buttonBackground} !important;`,
  ],
  [darkClass.buttonText, `color: ${darkTheme.buttonText} !important;`],
  [
    darkClass.buttonBorder,
    `border: ${stroke.bold} solid ${darkTheme.buttonBorder} !important; box-shadow: 5px 5px 0 ${darkTheme.buttonBorder} !important;`,
  ],
  [
    darkClass.headerBackground,
    `background-color: ${darkTheme.headerBackground} !important;`,
  ],
  [darkClass.headerText, `color: ${darkTheme.headerText} !important;`],
] as const;

const outlookCss = rules
  .map(([className, rule]) => {
    const attr = rule.startsWith("background") ? "data-ogsb" : "data-ogsc";
    return `[${attr}] .${className} { ${rule} }`;
  })
  .join("\n");

export const darkModeCss = `
  @media (prefers-color-scheme: dark) {
    ${rules.map(([className, rule]) => ` .${className} { ${rule} }`).join("\n")}
  }
  /* Outlook-specific dark mode fixes */
  ${outlookCss}
`;
