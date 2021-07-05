const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpack = require('./webpack.base.conf')
const { merge } = require('webpack-merge')

Object.keys(baseWebpack.entry).forEach(function (name) {
  baseWebpack.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(baseWebpack.entry[name])
});
module.exports = merge(baseWebpack, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    }),
  ],
}
)