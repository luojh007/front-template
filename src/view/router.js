import React from 'react';
import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import ScrollToTop from '../components/ScrollToTop';
import MainLayout from '../components/MainLayout/MainLayout';
import { Spin } from 'antd';
const Root = ({ route }) => (
  <ScrollToTop>
    <MainLayout>{renderRoutes(route.routes)}</MainLayout>
  </ScrollToTop>
);
const Loading = ({ error, pastDelay }) => {
  if (error) {
    console.log(error);
    return <div>Error!</div>;
  } else if (pastDelay) {
    return (
      <Spin tip='Loading...'>
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
      routes: [
        {
          path: '/videoDemo.html',
          component: Loadable({
            loader: () => import('./routes/VideoDemo'),
            loading: Loading
          })
        },
        {
          path: '/timeManage.html',
          component: Loadable({
            loader: () => import('./routes/TimeManage'),
            loading: Loading
          })
        },
        {
          path: '/thingsDid.html',
          component: Loadable({
            loader: () => import('./routes/ThingsDid'),
            loading: Loading
          })
        },
        {
          path: '/lTable.html',
          // exact: true,
          component: Loadable({
            loader: () => import('./routes/LTable/list'),
            loading: Loading
          })
        },
        {
          path: '/importModal.html',
          // exact: true,
          component: Loadable({
            loader: () => import('./routes/ImportFile'),
            loading: Loading
          })
        },
        {
          path: '/multipleAdd/base.html',
          // exact: true,
          component: Loadable({
            loader: () => import('./routes/MultipleAdd/base/index'),
            loading: Loading
          })
        },
        {
          path: '/multipleAdd/complexOne.html',
          // exact: true,
          component: Loadable({
            loader: () => import('./routes/MultipleAdd/complexOne/index'),
            loading: Loading
          })
        },
        {
          path: '/uploadMultiple.html',
          // exact: true,
          component: Loadable({
            loader: () => import('./routes/UploadMultiple'),
            loading: Loading
          })
        },
        {
          path: '/chart/tabsBase.html',
          // exact: true,
          component: Loadable({
            loader: () => import('./routes/Chart/tabsBase'),
            loading: Loading
          })
        },
        {
          path: '/tree/one.html',
          // exact: true,
          component: Loadable({
            loader: () => import('./routes/Tree/one'),
            loading: Loading
          })
        },
        {
          path: '/modal/one.html',
          // exact: true,
          component: Loadable({
            loader: () => import('./routes/Modal/one'),
            loading: Loading
          })
        },
        {
          path: '/fatherSub.html',
          component: Loadable({
            loader: () => import('./routes/fatherSub'),
            loading: Loading
          })
        },
        {
          path: '/index.html',
          component: Loadable({
            loader: () => import('./routes/index'),
            loading: Loading
          })
        },
        {
          path: '/print.html',
          component: Loadable({
            loader: () => import('./routes/Print'),
            loading: Loading
          })
        },
        {
          path: '/lifeCycle.html',
          component: Loadable({
            loader: () => import('./routes/LifeCycle'),
            loading: Loading
          })
        },
        {
          path: '/table.html',
          component: Loadable({
            loader: () => import('./routes/Table'),
            loading: Loading
          })
        }
      ]
    }
  ];
  return <div>{renderRoutes(routes)}</div>;
}
export default RootRouter;
