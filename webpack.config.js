const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "main.js",
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  resolve: {
    extensions: [".js"]
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
      type: "asset/resource"
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
      hash: true
    }),
    new MiniCssExtractPlugin()
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve("src", "assets", "images"),
    //       to: "assets/images"
    //     }
    //   ]
    // })
  ]
}