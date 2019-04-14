import { createStore ,applyMiddleware ,compose } from 'redux'
import Reducer from '../reducers/index'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import createLogger  from 'redux-log'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const middleware = [
  createLogger({ collapsed: true }),
  routerMiddleware(createHistory()),
]
const store = createStore(Reducer,composeEnhancers(applyMiddleware(...middleware)))

export default store