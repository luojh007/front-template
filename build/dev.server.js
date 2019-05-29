const webpack = require('webpack');
var history = require('connect-history-api-fallback');

const webpackConfig = require('./webpack.dev.conf')
const compiler = webpack(webpackConfig);
const express = require('express');
const app = express();

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false
})

app.use(history({
  rewrites: [
    { from: /\w+\.html/, to: '/' },
  ]
}));
app.use(devMiddleware)

app.use(hotMiddleware)

app.listen(3000, () => {
  console.log("成功启动：localhost:" + '3000')
})