const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "../css/[name].css",
  disable: process.env.NODE_ENV === "development"
});

if(JSON.parse(process.env.PROD_ENV || '0')) {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  target: "node",
  entry: {
    app: "./resources/js/app.js",
    vendor: "./resources/js/vendor.js",
    firebase: "./resources/js/firebase.js",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          // use style-loader in development
          fallback: ["style-loader"]
        })
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader:'file-loader?name=[name].[ext]&outputPath=../fonts/'
      },
    ],
  },
  plugins: [
    extractSass,
  ]
}
