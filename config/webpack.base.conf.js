const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {
    app: ['webpack-hot-middleware/client?noInfo=true&reload=true', './src/index.js'],
    vendor: ['react', 'redux', 'react-redux', 'antd'], // 'lodash' 'moment', 'rc-calendar'  
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    chunkFilename: '[id][hash].js'
  },
  stats: 'errors-only',
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
        test: /(\.css|\.less)$/,
        include: [path.resolve(__dirname, '../src')],
        use: [{
          loader: 'style-loader'
        },
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: true,     //antd按需引用时不得打开
            url: true,
            minimize: process.env.NODE_ENV === 'production',
            // sourceMap: config.build.productionSourceMap,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          }
        },
        {
          loader: 'less-loader'
        },],
      },
      {
        test: /(\.css|\.less)/,
        include: [path.resolve(__dirname, '../node_modules')],
        use: ["style-loader", "css-loader", "less-loader"],
      }
    ]
  }
}