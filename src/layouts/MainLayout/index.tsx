/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Spinner } from 'components/Spinner';
import { Header } from 'components/Header';

import { useAppContext } from 'providers/AppProvider';
import { SbarLeft } from 'components';

const MainLayout = ({ children, logo, isColorMode }: any) => {
  const { mainRoutes, isLogin, componentHeader, integration, noHeader } = useAppContext();
  return isLogin() ? (
    <div className="container-fluid">
      <div className="row">
        <main className="p-0">
          {!noHeader && (
            <Header logo={logo} isColorMode={isColorMode}>
              {componentHeader && componentHeader}
            </Header>
          )}
          <div
            className={`main_content vh-100 main_content_dashboard d-flex ${
              !noHeader && 'pd-t-80'
            }`}
          >
            <SbarLeft />
            <div className="flex-1 mh-100 overflow-hidden overflow-y-auto position-relative main-content">
              <Suspense fallback={<Spinner />}>
                {integration
                  ? children
                  : mainRoutes.map(({ path, exact, main }: any, i: any) => (
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
