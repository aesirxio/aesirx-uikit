/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

export const UtilsViewModelContext = React.createContext();

export const UtilsViewModelContextProvider = ({ children, viewModel }: any) => {
  return (
    <UtilsViewModelContext.Provider value={viewModel}>{children}</UtilsViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useUtilsViewModel = () => React.useContext(UtilsViewModelContext);

/* HOC to inject store to any functional or class component */
export const withUtilsViewModel = (Component: any) => (props: any) => {
  return (
    <Component {...props} parentViewModel={props?.viewModel} viewModel={useUtilsViewModel()} />
  );
};
