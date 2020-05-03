
 
System.register([], function($__export, $__moduleContext) {
  var projectConfig;
  $__export({    
      projects: [
        {
          "name": "app1_app", //模块名称
          "path": "/app1", //模块url前缀
          "prefix": "/app1/", //模块文件路径前缀
          // "main": "/app1/js/app.js", //模块渲染出口文件
          // "store": "/app1/js/store.js", //模块渲染出口文件
          "main": "http://localhost:3001/app.js", //模块渲染出口文件
          "store": "http://localhost:3001/store.js",//模块对外接口
        }
      ]    
  });
  return { execute: function() {} };
});
