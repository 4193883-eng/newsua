const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const cssImportLoader =
  process.env.NODE_ENV === "production"
    ? MiniCssExtractPlugin.loader
    : "style-loader";

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    newspage: "./src/newspage.js",
    admin: "./src/admin.js",
    about: "./src/about.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.css$/,
        use: [cssImportLoader, "css-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: [cssImportLoader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|svg|txt)$/,
        type: "asset/resource",
      },
      {
        test: /\.(hbs|handlebars)$/,
        loader: "handlebars-loader",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets",
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.hbs",
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/newspage.hbs",
      chunks: ["newspage"],
      filename: "newspage.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/admin.hbs",
      chunks: ["admin"],
      filename: "admin.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/about.hbs",
      chunks: ["about"],
      filename: "about.html",
    }),
  ],
};
