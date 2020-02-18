const autoPrefixer = require("autoprefixer");

exports.postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
  autoPrefixer
];

exports.postCSSAutoPrefixer = {
  loader: "postcss-loader",
  options: {
    plugins: {
      autoprefixer: {
        browsers: ["last 5 versions", "> 3%"]
      }
    }
  }
};
