const webpack = require('webpack');
var history = require('connect-history-api-fallback');
const webpackConfig = require('./webpack.dev.conf')
const compiler = webpack(webpackConfig);
const Express = require('express');
const app = new Express();
const config = require('../config/index')
const port = config.dev.port
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,  // asset of path
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  hot: true,
})

app.use(history({
  rewrites: [
    { from: /\w+\.html/, to: '/' },
  ]
}));
app.use(devMiddleware)

app.use(hotMiddleware)

app.listen(port, () => {
  console.log("成功启动：localhost:" + port)
})