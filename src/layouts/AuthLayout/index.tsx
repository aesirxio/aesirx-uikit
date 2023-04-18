/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spinner } from 'components/Spinner';
import { useAppContext } from 'providers/AppProvider';

const AuthLayout = () => {
  const { authRoutes, isLogin } = useAppContext();

  return isLogin() ? (
    <Redirect to="/" />
  ) : (
    <div className="container-fluid">
      <div className="row">
        <main>
          <Suspense fallback={<Spinner />}>
            {authRoutes.map(({ path, exact, main }: any, i: number) => (
              <Route key={i} exact={exact} path={path} component={main} />
            ))}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export { AuthLayout };
