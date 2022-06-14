const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "[name].[contenthash].js",
    // filename: "main.js",
    assetModuleFilename: 'static/images/[hash][ext][query]',
  },
  mode: "development",
  resolve: {
    extensions: [".js"],
    alias: {
      Images: path.resolve("src", "assets", "images"),
      Templates: path.resolve("src", "templates"),
      Utils: path.resolve("src", "utils"),
      Styles: path.resolve("src", "styles"),
    }
  },
  module: {
    rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.html$/i,
      loader: "html-loader",
    },
    {
      test: /\.png/, //Si se necesita importar otros archivos solo se coloca aqui.
      type: "asset/resource",
    },
    {
      test: /\.(woff|woff2)$/, //Si se necesita importar otros archivos solo se coloca aqui.
      type: "asset",
      generator: {
        filename: 'static/fonts/[hash][ext][query]' //Se indica en que carpeta serán
        //enviados los fonts
      }
    },
    {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 
        "css-loader"
      ],
    }
  ]},
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./public/index.html",
      filename: "./index.html",
      // hash: true
    }),
    new MiniCssExtractPlugin({
      filename: "./static/[name].[contenthash].css",
    }),
    new Dotenv(),
  ],
}