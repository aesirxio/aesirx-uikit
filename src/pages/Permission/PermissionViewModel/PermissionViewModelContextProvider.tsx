/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { PermissionStore } from '../store';
import PermissionViewModel from './PermissionViewModel';

const permissionStore = new PermissionStore();
const permissionViewModel = new PermissionViewModel(permissionStore);

interface IPermissionContext {
  model: PermissionViewModel;
}
export const PermissionViewModelContext = React.createContext<IPermissionContext>({
  model: permissionViewModel,
});

export const PermissionViewModelContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PermissionViewModelContext.Provider value={{ model: permissionViewModel }}>
      {children}
    </PermissionViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const usePermissionViewModel = () => React.useContext(PermissionViewModelContext);

/* HOC to inject store to any functional or class component */
export const withPermissionViewModel = (Component: any) => (props: any) => {
  return <Component {...props} {...usePermissionViewModel()} />;
};
