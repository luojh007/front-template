const path = require('path')
var config = require('../config')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
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
        test: /\.js[x]?$/,
        include: [resolve("src")],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
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