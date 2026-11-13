/**
 * Outlook needs some very specific XML-namespaced attributes.
 * Astro's built-in HTML types don't include them, so they're extended manually.
 */
declare namespace astroHTML.JSX {
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/consistent-type-definitions -- needed for override
  interface HtmlHTMLAttributes {
    "xmlns:o"?: string;
    "xmlns:w"?: string;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/consistent-type-definitions -- needed for override
  interface HTMLAttributes {
    "xml:lang"?: string;
  }
}
