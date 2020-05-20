const path = require('path')
var config = require('../config')
const HappyPack = require('happypack');

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
        use: [
          {
            loader: "happypack/loader?id=babel",
          }
        ],
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
  plugins: [
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: [{
        path: 'babel-loader',
        cache: true,
        query: {
          presets: ["@babel/preset-react"]
        }
      }],
      // ... 其它配置项
    }),
  ],
}