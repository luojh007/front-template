const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpack = require('./webpack.base.conf')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

Object.keys(baseWebpack.entry).forEach(function (name) {
  baseWebpack.entry[name] = ["./build/dev-client"].concat(
    baseWebpack.entry[name]
  );
});
module.exports = merge(baseWebpack, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /(\.css|\.less)/,
        include: [
          resolve("src/components"),
          resolve("src/view/"),
        ],
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            }
          },
          { loader: "less-loader" },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")()]
            }
          },
        ],
      },
      {
        test: /(\.css|\.less)$/,
        exclude: [
          resolve("src/components"),
          resolve("src/view/"),
        ],
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: false,     //antd按需引用时不得打开
              url: true,
              // sourceMap: config.build.productionSourceMap,
              localIdentName: '[name]__[local]___[hash:base64:5]',
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
        ],
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    }),
    new FriendlyErrorsWebpackPlugin({
      onErrors: () => {
      },
      clearConsole: true,
    }),
  ],
}
)