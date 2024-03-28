/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { RoleStore } from '../store';
import RoleViewModel from './RoleViewModel';

const roleStore = new RoleStore();
const roleViewModel = new RoleViewModel(roleStore);

interface IRoleContext {
  model: RoleViewModel;
}
export const RoleViewModelContext = React.createContext<IRoleContext>({
  model: roleViewModel,
});

export const RoleViewModelContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoleViewModelContext.Provider value={{ model: roleViewModel }}>
      {children}
    </RoleViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useRoleViewModel = () => React.useContext(RoleViewModelContext);

/* HOC to inject store to any functional or class component */
export const withRoleViewModel = (Component: any) => (props: any) => {
  return <Component {...props} {...useRoleViewModel()} />;
};
