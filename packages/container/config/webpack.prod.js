const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require('./webpack.common.js');
const path = require("path");
const deps = require("../package.json").dependencies;

const prodConfig = {
  mode: "production",
  output:{
    path: path.resolve(__dirname, "..", "./dist"),
    filename: "[name].[contenthash:8].js",
    publicPath: "/container/latest/"
    
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@http://localhost:8081/marketing/remoteEntry.js`
      },
      exposes: {
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