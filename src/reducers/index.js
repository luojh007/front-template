import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { login } from './login'
export default function createStore() {
  combineReducers({
    login: login,
    router: routerReducer  //将 reducer 声明到 store 里面的 router 键
  })
}