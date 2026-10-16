// eslint-disable-next-line import-x/no-anonymous-default-export -- required config structure
export default {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          inlineStyles: { onlyMatchedOnce: false },
        },
      },
    },
    "convertStyleToAttrs",
    "removeTitle",
    "prefixIds",
  ],
};