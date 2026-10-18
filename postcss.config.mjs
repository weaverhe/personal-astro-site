import path from "node:path";
import postcssUtilities from "postcss-utilities";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";
import postcssCustomSelectors from "postcss-custom-selectors";
import postcssMixins from "postcss-mixins";

const config = {
  plugins: [
    postcssMixins({
      mixinsFiles: path.join(import.meta.dirname, "src/styles/mixins.css"),
    }),
    postcssUtilities,
    postcssCustomSelectors(),
    postcssPresetEnv(),
    cssnano,
  ],
};

export default config;
