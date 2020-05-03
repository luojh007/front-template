import './libs/system.js'
import './libs/es6-promise.auto.min.js'

import { registerApplication, start, } from 'single-spa'
//全局的事件派发器 (新增)
import { GlobalEventDistributor } from './libs/GlobalEventDistributor'
const globalEventDistributor = new GlobalEventDistributor();

// hash 模式,项目路由用的是hash模式会用到该函数
export function hashPrefix(app) {
  return function (location) {
    let isShow = false
    //如果该应用 有多个需要匹配的路劲
    if (isArray(app.path)) {
      app.path.forEach(path => {
        if (location.hash.startsWith(`#${path}`)) {
          isShow = true
        }
      });
    }
    // 普通情况
    else if (location.hash.startsWith(`#${app.path || app.url}`)) {
      isShow = true
    }
    return isShow;
  }
}

// pushState 模式
export function pathPrefix(app) {
  return function (location) {
    let isShow = false
    //如果该模块 有多个需要匹配的路径
    if (isArray(app.path)) {
      app.path.forEach(path => {
        if (location.pathname.indexOf(`${path}`) === 0) {
          isShow = true
        }
      });
    }
    // 普通情况
    else if (location.pathname.indexOf(`${app.path || app.url}`) === 0) {
      isShow = true
    }
    console.log(isShow)
    return isShow;
  }
}
//数组判断 用于判断是否有多个url前缀
function isArray(o) {
  return Object.prototype.toString.call(o) == '[object Array]';
}

export async function registerApp(params) {
  //导入派发器
  let storeModule = {}, customProps = { globalEventDistributor: globalEventDistributor };

  try {
    storeModule = params.store ? await SystemJS.import(params.store) : { default: null }
  } catch (error) {
    console.log(`无法加载${params.name}的store数据`)
    return;
  }

  if(storeModule.default && globalEventDistributor){
    //注册到全局
    globalEventDistributor.registerStore(storeModule.default)
    
    customProps.store = storeModule.default;
  }

  customProps = {
    store: storeModule,
    globalEventDistributor: globalEventDistributor
  };
  console.log(customProps);
  registerApplication(
    params.name,
    () => SystemJS.import(params.main),
    params.base ? true : pathPrefix(params),
    customProps
  )
}