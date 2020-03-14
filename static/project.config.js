module.exports = [{
  "name": "name", //模块名称
  "path": "/project", //模块url前缀
  "prefix": "/app1/", //模块文件路径前缀
  "main": "/app1/app.js", //模块渲染出口文件
  "store": "/module-prefix/store.js",//模块对外接口
}, {
  "name": "name2", //模块名称
  "path": "/project2", //模块url前缀
  "prefix": "app2/", //模块文件路径前缀
  "main": "/app2/app.js", //模块渲染出口文件
  "store": "/module-prefix/store.js",//模块对外接口
}
]