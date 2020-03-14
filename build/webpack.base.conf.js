const path = require('path')
var config = require('../config')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {
    app: resolve("src/index.js"),
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
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-react"]
        },
        include: [resolve("src")]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        query: {
          // limit: 10000,
          name: 'static/images/[name].[hash:7].[ext]'
        },
        include: [resolve("src"), resolve("node_modules/@317hu")]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: 'static/images/[name].[hash:7].[ext]'
        }
      }
    ]
  },
}