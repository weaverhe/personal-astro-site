import postcssUtilities from "postcss-utilities";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";

const config = {
  plugins: [postcssUtilities, postcssPresetEnv(), cssnano],
};

export default config;
