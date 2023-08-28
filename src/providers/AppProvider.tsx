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
  logo?: any;
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
  logo?: any;
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
  logo,
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
    <ErrorBoundary>
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
          logo,
        }}
      >
        <ThemesContextProvider>
          <AesirXI18nextProvider appLanguages={appLanguages}>
            <Toast />
            <BrowserRouter>
              {integration ? (
                <MainLayout logo={logo}>{children}</MainLayout>
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
                        <SettingLayout logo={logo} />
                      </Route>
                    )}
                    {mainPath && (
                      <Route path={mainPath}>
                        <MainLayout logo={logo} />
                      </Route>
                    )}
                    <Route path="*">
                      <NotFound />
                    </Route>
                  </Switch>
                </Router>
              )}
            </BrowserRouter>
          </AesirXI18nextProvider>
        </ThemesContextProvider>
      </AppContext.Provider>
    </ErrorBoundary>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
