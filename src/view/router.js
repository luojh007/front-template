import React from 'react';
import { renderRoutes } from 'react-router-config'
import Loadable from 'react-loadable';
import ScrollToTop from '../components/ScrollToTop'
import MainLayout from '../components/MainLayout/MainLayout'
const Root = ({ route }) => (
  <ScrollToTop>
    <MainLayout>
      {renderRoutes(route.routes)}
    </MainLayout>
  </ScrollToTop>
)
const Loading = ({ error, pastDelay }) => {
  if (error) {
    console.log(error);
    return <div>Error!</div>;
  } else if (pastDelay) {
    return (
      <Spin tip="Loading...">
        <div style={{ height: 500 }} />
      </Spin>
    );
  } else {
    return null;
  }
};
function RootRouter() {
  const routes = [
    {
      component: Root,
      routes: [{
        path: '/videoDemo.html',
        component: Loadable({
          loader: () => import('./routes/VideoDemo'),
          loading: Loading,
        })
      },
      {
        path: '/timeManage.html',
        component: Loadable({
          loader: () => import('./routes/TimeManage'),
          loading: Loading,
        })
      },
      {
        path: '/thingsDid.html',
        component: Loadable({
          loader: () => import('./routes/ThingsDid'),
          loading: Loading,
        })
      },
      {
        path: '/lTable.html',
        // exact: true,
        component: Loadable({
          loader: () => import('./routes/LTable/list'),
          loading: Loading,
        })
      },
      {
        path: '/importModal.html',
        // exact: true,
        component: Loadable({
          loader: () => import('./routes/ImportFile'),
          loading: Loading,
        })
      },
      {
        path: '/multipleAdd/base.html',
        // exact: true,
        component: Loadable({
          loader: () => import('./routes/MultipleAdd/base/index'),
          loading: Loading,
        })
      },
      {
        path: '/multipleAdd/complexOne.html',
        // exact: true,
        component: Loadable({
          loader: () => import('./routes/MultipleAdd/complexOne/index'),
          loading: Loading,
        })
      },
      {
        path: '/uploadMultiple.html',
        // exact: true,
        component: Loadable({
          loader: () => import('./routes/UploadMultiple'),
          loading: Loading,
        })
      },
      {
        path: '/chart/tabsBase.html',
        // exact: true,
        component: Loadable({
          loader: () => import('./routes/Chart/tabsBase'),
          loading: Loading,
        })
      },
      {
        path: '/tree/one.html',
        // exact: true,
        component: Loadable({
          loader: () => import('./routes/Tree/one'),
          loading: Loading,
        })
      },
      ]
    }
  ]
  return <div>{renderRoutes(routes)}</div>
}
export default RootRouter;