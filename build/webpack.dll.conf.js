const webpack = require('webpack')
const library = '[name]'
const path = require('path')
var config = require('../config')
const TerserJSPlugin = require("terser-webpack-plugin");
module.exports = {
  entry: {
    vendors: ['moment'],
    vendorsReact: ['react', 'redux', 'react-redux', 'antd'],
  },
  mode: 'production',
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dist' + config.build.assetsPublicPath),
    publicPath: path.resolve(__dirname, '../dist' + config.build.assetsPublicPath), // 
    library
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dist/[name]-manifest.json'),
      name: library
    }),
  ],
  performance: {
    hints: false,  //关闭文件过大警告提醒
  },
  devtool: false,
  //压缩js
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
    ]
  },
}
