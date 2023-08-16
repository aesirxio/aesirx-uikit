/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Suspense } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { Spinner } from 'components/Spinner';
import { Header } from 'components/Header';
import { useAppContext } from 'providers';
import { SbarLeft } from 'components';

const SettingLayout = () => {
  const { isLogin, settingRoutes } = useAppContext();

  return isLogin() ? (
    <div className="container-fluid">
      <div className="row">
        <main className="p-0">
          <Header />
          <div className="main_content vh-100 main_content_dashboard pd-t-80 d-flex">
            <SbarLeft />
            <div className="flex-1 bg-body mh-100 overflow-hidden overflow-y-auto position-relative">
              <Suspense fallback={<Spinner />}>
                {settingRoutes.map(({ path, exact, main }: any, i: any) => (
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

export { SettingLayout };
