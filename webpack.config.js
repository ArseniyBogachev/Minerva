const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = (env) => {
  const isDev = env.mode === "development";

  const cssLoader = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };

  const config = {
    mode: env.mode ?? "development",
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    entry: "./src/index.js",
    output: {
      // filename: '[name].[contenthash].js',
      filename: "bundle.js",
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      isDev
        ? undefined
        : new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
          }),
    ],
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            cssLoader,
            "sass-loader",
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
      ],
    },
    devServer: {
      port: env.port ?? 3000,
      historyApiFallback: true,
      host: "0.0.0.0",
      allowedHosts: "all",
    },
  };

  return config;
};
