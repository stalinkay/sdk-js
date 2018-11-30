const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const libraryName = "directus-sdk";

const clientDevelopmentConfig = {
  target: "web",
  mode: "development",
  entry: __dirname + "/src/index.js",
  devtool: "inline-source-map",
  output: {
    path: __dirname + "/dist",
    filename: libraryName + ".umd.js",
    library: "DirectusSDK",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"]
  }
};

const clientProductionConfig = Object.assign({}, clientDevelopmentConfig, {
  mode: "production",
  devtool: "source-map",
  output: {
    ...clientDevelopmentConfig.output,
    filename: libraryName + ".umd.min.js"
  }
});

const serverConfig = {
  target: "node",
  mode: "production",
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: libraryName + ".js",
    library: "DirectusSDK",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"]
  },
  externals: [nodeExternals()]
}

module.exports = [clientDevelopmentConfig, clientProductionConfig, serverConfig];
