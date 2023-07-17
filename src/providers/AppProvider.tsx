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
import { SettingLayout } from 'layouts/SettingLayout';

interface IAppContext {
  authRoutes: any;
  mainRoutes: any;
  settingRoutes?: any;
  isLogin: any;
  componentHeader?: any;
  rootId?: any;
  noavatar?: any;
  integration?: any;
  leftMenu?: any;
  profileMenu?: any;
  componentBottomMenu?: any;
  settingMenu?: any;
  noHeader: boolean;
}

interface AppProviderProps {
  authRoutes: any;
  mainRoutes: any;
  settingRoutes?: any;
  isLogin: any;
  componentHeader?: any;
  rootId?: any;
  noavatar?: any;
  integration?: any;
  leftMenu?: any;
  profileMenu?: any;
  componentBottomMenu?: any;
  settingMenu?: any;
  appLanguages: any;
  children?: any;
  noHeader: boolean;
}

const AppContext = createContext<IAppContext>({
  authRoutes: [],
  mainRoutes: [],
  settingRoutes: [],
  isLogin: null,
  rootId: '#root',
  noavatar: false,
  integration: false,
  profileMenu: [],
  noHeader: false,
});

const AppProvider: React.FC<AppProviderProps> = ({
  authRoutes,
  mainRoutes,
  appLanguages,
  isLogin,
  componentHeader,
  componentBottomMenu,
  rootId = '#root',
  noavatar = false,
  integration,
  children,
  leftMenu,
  profileMenu,
  settingRoutes,
  settingMenu,
  noHeader,
}: AppProviderProps) => {
  const authPath = authRoutes
    ?.map((item: any) => {
      return item.path;
    })
    .reduce((arr: any, el: any) => {
      return arr.concat(el);
    }, []);

  const mainPath = mainRoutes
    ?.map((item: any) => {
      return item.path;
    })
    .reduce((arr: any, el: any) => {
      return arr.concat(el);
    }, []);

  const settingPath = settingRoutes
    ?.map((item: any) => {
      return item.path;
    })
    .reduce((arr: any, el: any) => {
      return arr.concat(el);
    }, []);

  return (
    <div className="aesirxui">
      <AppContext.Provider
        value={{
          authRoutes,
          mainRoutes,
          settingRoutes,
          isLogin,
          componentHeader,
          componentBottomMenu,
          rootId,
          noavatar,
          integration,
          leftMenu,
          profileMenu,
          settingMenu,
          noHeader,
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
                        {authPath && (
                          <Route exact path={authPath}>
                            <AuthLayout />
                          </Route>
                        )}
                        {settingPath && (
                          <Route exact path={settingPath}>
                            <SettingLayout />
                          </Route>
                        )}
                        {mainPath && (
                          <Route path={mainPath}>
                            <MainLayout />
                          </Route>
                        )}
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
    </div>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
