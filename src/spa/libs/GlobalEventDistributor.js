//全局派发器，触发各个模块导出的api，改变全局数据
export class GlobalEventDistributor {
  constructor() {
    this.stores = [];  //所有子系统的数据
  }
  // 注册
  registerStore(store) {
    this.stores.push(store);
  }

  //
  globalDispatch(event) {
    this.stores.forEach((s) => {
      s.dispatch(event)
    });
  }

  // 获取所有模块当前的对外状态
  getState() {
    let state = {};
    this.stores.forEach(s => {
      let currentState = s.getState();
      // console.log(currentState)
      state[currentState.namespace] = currentState;
    });
    return state;
  }
}