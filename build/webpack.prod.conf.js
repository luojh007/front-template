const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpack = require('./webpack.base.conf')
const merge = require('webpack-merge')
var config = require('../config')
var utils = require('./utils')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
module.exports = merge(baseWebpack, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.js'), //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name]/[chunkhash].js' // [name] bundle-loader 的name配置值
  },
   //压缩js,css
   optimization: {   
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCssAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        /* 自定义的组件，样式 css-modules 化？？如果需要使用其他的 css 预编译程序，则可以去除以下两条配置 */
        test: /(\.css|\.less)$/,
        include: [
          resolve("src/components"),
          resolve("src/view"),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]"
              },
              sourceMap: config.build.productionSourceMap
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins:
                process.env.NODE_ENV === "production"
                  ? loader => [
                    require("postcss-import")({ root: loader.resourcePath }),
                    require("autoprefixer")()
                  ]
                  : []
            }
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /(\.css|\.less)$/,
        exclude: [
          resolve("src/components"),
          resolve("src/view"),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              sourceMap: config.build.productionSourceMap
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: {} // 使用了 antd 的全局样式配置时，.babelrc 仅支持 import 导入 "style": true
              // ["import", { "libraryName": "antd", "style": true, "comment": "true for .less, css for .css"}]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, '../dist', 'vendorsReact-manifest.json')),
      name: 'vendorsReact'
    }),
    new webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, '../dist', 'vendors-manifest.json')),
      name: 'vendors'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false,
        keepClosingSlash: true
      },
      hash: false,
      chunksSortMode: 'auto' // auto | dependency
    }),
    new AddAssetHtmlPlugin([{
      filepath: path.resolve(config.build.assetsRoot, './vendors.dll.js'),
    }, {
      filepath: path.resolve(config.build.assetsRoot, './vendorsReact.dll.js'),
    }]),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "./css/[name].css"
    }),
  ],
}
)