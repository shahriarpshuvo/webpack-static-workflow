const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

let staticPages = fse
  .readdirSync("./static")
  .filter(function(file) {
    return file.endsWith(".html");
  })
  .map(function(page) {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./static/${page}`,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    });
  });

module.exports = {
  entry: {
    main: "./scripts/app.js",
    vendor: "./scripts/vendor.js"
  },
  plugins: staticPages,
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images"
          }
        }
      }
    ]
  }
};
