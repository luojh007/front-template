const path = require('path')
var config = require('../config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const proModal = process.env.NODE_ENV === 'production'
module.exports = {
  entry: {
    app: ['webpack-hot-middleware/client', './src/index.js'],
    vendor: ['react', 'redux', 'react-redux', 'antd'], // 'lodash' 'moment', 'rc-calendar'  
  },
  output: {
    filename: '[name].js',
    path: config.build.assetsRoot,
    // publicPath: proModal
    //   ? config.build.assetsPublicPath
    //   : config.dev.assetsPublicPath
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-2', 'react'],
          }
        },
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /([^/]+)\/?([^/]*)\.(js|jsx)?$/,
        use: [{
          loader: 'bundle-loader',
          options: {
            lazy: true,
            name: '[name]'
          }
        }, {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-2', 'react'],
          }
        }
        ],
        include: [path.resolve(__dirname, '../src/view/routes')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/images/[name].[hash:7].[ext]"
            }
          }
        ]
      }
    ]
  },
}