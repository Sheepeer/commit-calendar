const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/src/index.html"),
  filename: "./index.html",
});

module.exports = {
  entry: path.join(__dirname, "examples/src/index.tsx"),
  output: {
    path: path.join(__dirname, "examples/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node-modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node-modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    port: 3000,
  },
};
