const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

const svgSprite =  new CopyPlugin([{
  from: './images/icons/sprite.svg',
  to: 'images/icons',
}]);

let htmlFiles = fse
  .readdirSync("./static")
  .filter(function (file) {
    return file.endsWith(".html");
  })
  .map(function (page) {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./static/${page}`,
    });
  })[0];


module.exports = {
  entry: {
    main: "./scripts/app.js",
    vendor: "./scripts/vendor.js"
  },

  plugins: [
    htmlFiles,
    svgSprite,
  ],
  module: {
    rules: [{
        test: /\.html$/,
        use: {
          loader: 'html-srcsets-loader',
          options: {
            interpolate: true,
            attrs: ['img:src', ':srcset']
          }
        }
      },
    ]
  }
};