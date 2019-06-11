import React from 'react';
import { renderRoutes } from 'react-router-config'
import Bundle from '../core/bundle'
import ScrollToTop from '../components/ScrollToTop'
import MainLayout from '../components/MainLayout/MainLayout'
//经过bundle-loader包装过的组件，实现按需加载
const createChildRouteComponent = (container, props, ) => (
  <Bundle load={container}>
    {(View) => <View {...props} />}
  </Bundle>
)
const Root = ({ route }) => (
  <ScrollToTop>
    <MainLayout>
      {renderRoutes(route.routes)}
    </MainLayout>
  </ScrollToTop>
)
function RouterConfig() {
  const routes = [
    {
      component: Root,
      routes: [{
        path: '/videoDemo.html',
        exact: true,
        component: (props) => {
          return createChildRouteComponent(require('./routes/VideoDemo'), props);

        }
      }, {
        path: '/timeManage.html',
        exact: true,
        component: (props) => {
          return createChildRouteComponent(require('./routes/TimeManage'), props);

        }
      }, {
        path: '/thingsDid.html',
        exact: true,
        component: (props) => {
          return createChildRouteComponent(require('./routes/ThingsDid'), props);

        }
      },]
    }
  ]
  return <div>{renderRoutes(routes)}</div>
}

export default RouterConfig;