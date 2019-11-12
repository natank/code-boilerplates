const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin")
const fs = require('fs');

const getParams = () => {
  const params = fs.readFileSync(path.resolve(__dirname, '../params.json'));
  console.log(`parmas1: ${params}`)
  const jparams = JSON.parse(params)
  return jparams
}

module.exports = {
  entry: {
    main: ["./src/main.js"]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist",
    hot: true,
    open: true,
    progress: true,
    stats: {
      colors: true
    }
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: "babel-loader"
      }],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [{
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      }
      ]
    },
    {
      test: /\.html$/,
      use: [{
        loader: "html-loader",
        options: {
          attrs: ["img:src"]
        }
      }]
    },
    {
      test: /\.pug$/,
      use: [{
        loader: "pug-loader"
      }]
    },
    {
      test: /\.(jpg|gif|png)$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "images/[name]-[hash:8].[ext]"
        }
      }]
    }
    ]
  },
  plugins: [

    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/templates/index.pug",
      filename: "home.html",
      templateParameters: getParams()
    }),
    new HTMLWebpackPlugin({
      template: "./src/templates/temp.pug",
      filename: "temp.html"
    })
  ]
}