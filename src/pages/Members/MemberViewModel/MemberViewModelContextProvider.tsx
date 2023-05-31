/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { MemberStore } from '../store';
import MemberViewModel from './MemberViewModel';
import React from 'react';
interface IMemberContext {
  model: MemberViewModel;
}

const memberStore = new MemberStore();
const memberModel = new MemberViewModel(memberStore);

export const MemberViewModelContext = React.createContext<IMemberContext>({ model: memberModel });

export const MemberViewModelContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemberViewModelContext.Provider value={{ model: memberModel }}>
      {children}
    </MemberViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useMemberViewModel = () => React.useContext(MemberViewModelContext);

/* HOC to inject store to any functional or class component */
export const withMemberViewModel = (Component: any) => (props: any) => {
  return <Component {...props} viewModel={useMemberViewModel()} />;
};
