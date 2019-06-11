const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpack = require('./webpack.base.conf')
const merge = require('webpack-merge')
var config = require('../config')
var utils = require('./utils')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = merge(baseWebpack, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.js'), //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name]/[chunkhash].js' // [name] bundle-loader 的name配置值
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
  ],
}
)