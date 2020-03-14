const path = require('path');
module.exports = {
  build: {
    env: 'prod',
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/static/'),
    assetsSubDirectory: 'assets',// static
    assetsPublicPath: '/static/', // /static/
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: 'dev',
    port: 8081,
    autoOpenBrowser: false,
    assetsSubDirectory: '/static/',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  },
}