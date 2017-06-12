const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "../css/[name].css",
  disable: process.env.NODE_ENV === "development"
});

if(JSON.parse(process.env.PROD_ENV || '0')) {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle:false
  }));
}

module.exports = {
  target: "node",
  devtool: "inline-sourcemap",
  entry: {
    app: "./resources/js/app.js",
    vendor: "./resources/js/vendor.js",
    firebaseConfig: "./resources/js/firebase.config.js",
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
    ],
  },
  plugins: [
    extractSass,
  ]
}
