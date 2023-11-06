/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { MemberRoleStore } from '../store';
import MemberRoleViewModel from './MemberRoleViewModel';

const memberRoleStore = new MemberRoleStore();
const roleViewModel = new MemberRoleViewModel(memberRoleStore);

interface IMemberRoleContext {
  model: MemberRoleViewModel;
}
export const MemberRoleViewModelContext = React.createContext<IMemberRoleContext>({
  model: roleViewModel,
});

export const MemberRoleViewModelContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemberRoleViewModelContext.Provider value={{ model: roleViewModel }}>
      {children}
    </MemberRoleViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useMemberRoleViewModel = () => React.useContext(MemberRoleViewModelContext);

/* HOC to inject store to any functional or class component */
export const withMemberRoleViewModel = (Component: any) => (props: any) => {
  return <Component {...props} {...useMemberRoleViewModel()} />;
};
