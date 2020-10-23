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
          path: '/table.html',
          component: Loadable({
            loader: () => import('./routes/OptimizeTable'),
            loading: Loading
          })
        }
      ]
    }
  ];
  return <div>{renderRoutes(routes)}</div>;
}
export default RootRouter;
