/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Spinner } from 'components/Spinner';
import { Header } from 'components/Header';

import { useAppContext } from 'providers/AppProvider';

const MainLayout = () => {
  const { mainRoutes, isLogin, componentHeader, leftMenu } = useAppContext();
  return isLogin() ? (
    <div className="container-fluid">
      <div className="row">
        <main className="p-0">
          <Header>{componentHeader}</Header>
          <div className="main_content vh-100 main_content_dashboard pd-t-80 d-flex">
            {leftMenu}
            <div className="flex-1 bg-body mh-100 overflow-hidden overflow-y-auto position-relative main-content">
              <Suspense fallback={<Spinner />}>
                {mainRoutes.map(({ path, exact, main }: any, i: any) => (
                  <Route key={i} exact={exact} path={path} component={main} />
                ))}
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export { MainLayout };
