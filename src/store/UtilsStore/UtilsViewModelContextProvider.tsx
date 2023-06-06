/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import UtilsStore from './UtilsStore';
import UtilsViewModel from './UtilsViewModel';

const utilsStore = new UtilsStore();
const utilsViewModel = new UtilsViewModel(utilsStore);

interface IUtilsContext {
  model: UtilsViewModel;
}

export const UtilsViewModelContext = React.createContext<IUtilsContext>({ model: utilsViewModel });

export const UtilsViewModelContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UtilsViewModelContext.Provider value={{ model: utilsViewModel }}>
      {children}
    </UtilsViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useUtilsViewModel = () => React.useContext(UtilsViewModelContext);

/* HOC to inject store to any functional or class component */
export const withUtilsViewModel = (Component: any) => (props: any) => {
  return <Component {...props} parentViewModel={props?.viewModel} {...useUtilsViewModel()} />;
};
