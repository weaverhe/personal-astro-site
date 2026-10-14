// eslint-disable-next-line import-x/no-anonymous-default-export -- stylelint recommended export
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-html",
    "stylelint-config-clean-order",
  ],
  rules: {
    // CSS Modules class names don't need to follow a global naming convention
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    // CSS Anchor Positioning API properties/functions not yet in stylelint-config-standard
    "property-no-unknown": [
      true,
      {ignoreProperties: ["position-try-fallbacks", "composes"]},
    ],
    "function-no-unknown": [true, {ignoreFunctions: ["anchor"]}],
    // `@util` is provided by postcss-utilities
    "at-rule-no-unknown": [true, {ignoreAtRules: ["util"]}],
    // CSS Modules `composes` values reference class names that may be camelCase
    "value-keyword-case": ["lower", {ignoreProperties: ["composes"]}],
  },
};
