import postcssUtilities from "postcss-utilities";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";
import postcssCustomSelectors from "postcss-custom-selectors";

const config = {
  plugins: [
    postcssUtilities,
    postcssCustomSelectors(),
    postcssPresetEnv(),
    cssnano,
  ],
};

export default config;
