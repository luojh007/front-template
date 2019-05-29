const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpack = require('./webpack.base.conf')
const merge = require('webpack-merge')
var config = require('../config')

module.exports = merge(baseWebpack, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.js'), //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
  output: {
    path: path.resolve(__dirname, '../dist'), // 输出的路径
    filename: 'bundle.js'  // 打包后文件
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, '../dist', 'vendorsReact-manifest.json')),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',        
      vendors: `<script type="text/javascript" src="${config.build.assetsPublicPath}vendors.dll.js"></script>`,
      vendorsReact: `<script type="text/javascript" src="${config.build.assetsPublicPath}vendorsReact.dll.js"></script>`,
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true,
      // config.build.assetsPublicPath <- apiConfig['assetsPublicPathConfig']
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false,
        keepClosingSlash: true
      },
      hash: false,
      chunksSortMode: 'auto' // auto | dependency
    }),
  ],
}
)