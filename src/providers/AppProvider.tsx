import React, { createContext, useContext } from 'react';
import { ThemesContextProvider } from './ThemeContextProvider';
import { ErrorBoundary } from 'layouts/ErrorBoundary';
import { AesirXI18nextProvider } from './I18nextProvider';
import { Toast } from 'components/Toast';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { history } from 'routes/history';

import { AuthLayout } from 'layouts/AuthLayout';
import { MainLayout } from 'layouts/MainLayout';
import { NotFound } from 'layouts/NotFound';

import { SSOContextProvider } from 'aesirx-sso';

interface IAppContext {
  authRoutes: any;
  mainRoutes: any;
  isLogin: any;
  componentHeader?: any;
  rootId?: any;
  noavatar?: any;
  integration?: any;
  leftMenu: any;
}

const AppContext = createContext<IAppContext>({
  authRoutes: null,
  mainRoutes: null,
  isLogin: null,
  rootId: '#root',
  noavatar: false,
  integration: false,
  leftMenu: [],
});

const AppProvider: React.FC = ({
  authRoutes,
  mainRoutes,
  appLanguages,
  isLogin,
  componentHeader,
  rootId,
  noavatar,
  integration,
  children,
  leftMenu,
}: any) => {
  const authPath = authRoutes
    .map((item: any) => {
      return item.path;
    })
    .reduce((arr: any, el: any) => {
      return arr.concat(el);
    }, []);

  const mainPath = mainRoutes
    .map((item: any) => {
      return item.path;
    })
    .reduce((arr: any, el: any) => {
      return arr.concat(el);
    }, []);

  return (
    <AppContext.Provider
      value={{
        authRoutes,
        mainRoutes,
        isLogin,
        componentHeader,
        rootId,
        noavatar,
        integration,
        leftMenu,
      }}
    >
      <ThemesContextProvider>
        <ErrorBoundary>
          <AesirXI18nextProvider appLanguages={appLanguages}>
            <SSOContextProvider>
              <Toast />
              <BrowserRouter>
                {integration ? (
                  <MainLayout>{children}</MainLayout>
                ) : (
                  <Router history={history}>
                    <Switch>
                      <Route exact path={authPath}>
                        <AuthLayout />
                      </Route>
                      <Route exact path={mainPath}>
                        <MainLayout />
                      </Route>
                      <Route path="*">
                        <NotFound />
                      </Route>
                    </Switch>
                  </Router>
                )}
              </BrowserRouter>
            </SSOContextProvider>
          </AesirXI18nextProvider>
        </ErrorBoundary>
      </ThemesContextProvider>
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
