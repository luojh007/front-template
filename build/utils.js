var path = require('path')
var config = require('../config')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}
// const extractCss = new ExtractTextPlugin({
//   filename: exports.assetsPath('css/[name].css'),
//   disable: process.env.NODE_ENV === "development"
// });

// exports.cssLoaders = function (options) {
//   options = options || {}

//   var cssLoader = {
//     loader: 'css-loader',
//     options: {
//       modules: options.includeNodeModules? false : true,
//       url: false,
//       minimize: process.env.NODE_ENV === 'production',
//       sourceMap: options.sourceMap,
//       localIdentName: '[name]__[local]___[hash:base64:5]',
//     },
//   }

//   function generateLoaders (loader, loaderOptions) {
//     var loaders = [cssLoader]
//     if (loader) {
//       loaders.push({
//         loader: loader + '-loader',
//         options: Object.assign({}, loaderOptions, {
//           sourceMap: options.sourceMap
//         })
//       })
//     }

//     // Extract CSS when that option is specified
//     // (which is the case during production build)
//     if (options.extract) {
//       return extractCss.extract({
//         use: loaders,
//         fallback: 'react-style-loader'// vue-style-loader
//       })
      
//     } else {
//       return ['react-style-loader'].concat(loaders)
//     }
//   }

//   return {
//     css: generateLoaders(),
//     postcss: generateLoaders(),
//     less: generateLoaders('less'),// 用来指定 antd 样式
//     sass: generateLoaders('sass', { indentedSyntax: true }),
//     scss: generateLoaders('sass'),
//     stylus: generateLoaders('stylus'),
//     styl: generateLoaders('stylus')
//   }
// }

// exports.styleLoaders = function (options) {
//   var output = []
//   var loaders = exports.cssLoaders(options)
//   for (var extension in loaders) {
//     var loader = loaders[extension];
//     output.push({
//       test: new RegExp('\\.' + extension + '$'),
//       use: loader,
//       include: options.includeNodeModules? [resolve('node_modules')] : [resolve('src'), resolve('examples')],
//     });
    
    
//   }
//   return output
// }
