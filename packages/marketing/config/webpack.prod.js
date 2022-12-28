const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

const deps = require("../package.json").dependencies;

const prodConfig = {
  mode:'production',
  output:{
    path: path.resolve(__dirname, "..", "./dist"),
    filename: "[name].[contenthash:8].js",
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
module.exports = merge(commonConfig, prodConfig);