/**
 * The tokens used in each email template.
 */
export const templateTokens = {
  confirm: ["name", "confirmUrl"],
} as const;

export type TemplateName = keyof typeof templateTokens;

export type TokenName<T extends TemplateName = TemplateName> =
  (typeof templateTokens)[T][number];

/**
 * Returns the token string for a given key.
 */
export const token = (key: TokenName) => `%%${key}%%`;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

/**
 * Fills the template with the provided token values.
 */
export const fillTemplate = <T extends TemplateName>(
  _template: T,
  html: string,
  values: Record<TokenName<T>, string>,
) => {
  html = html.replaceAll(/%%(?<key>\w+)%%/gv, (_match, key: string) => {
    if (!Object.hasOwn(values, key)) {
      throw new Error(`Missing value for token: ${key}`);
    }

    return escapeHtml(values[key as TokenName<T>]);
  });

  return html;
};
