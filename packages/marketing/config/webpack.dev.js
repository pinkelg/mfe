const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require('./webpack.common.js');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

const deps = require("../package.json").dependencies;

const devConfig = {
  mode:'development',
  devServer: {
    port: 8081,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      remotes: {
      },
      exposes: {
        './MarketingIndex': './src/bootstrap'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"]
        }
      }
    })
  ]
}
module.exports = merge(commonConfig, devConfig);