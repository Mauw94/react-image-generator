"use strict";

const webpack = require('webpack')
const dotenv = require('dotenv')
const CopyPlugin = require("copy-webpack-plugin")

dotenv.config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new CopyPlugin({
      patterns: [
        { from: "index.html", to: "index.html" },
      ],
    })
  ],

  // Set debugging source maps to be "inline" for
  // simplicity and ease of use
  devtool: "inline-source-map",

  // The application entry point
  entry: ["./src/index.tsx"],

  // Where to compile the bundle
  // By default the output directory is `dist`
  output: {
    filename: "bundle.js"
  },

  // Supported file loaders
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ],
  },

  // File extensions to support resolving
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  }
};