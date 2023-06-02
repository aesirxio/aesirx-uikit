/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { MemberStore } from '../store';
import MemberViewModel from './MemberViewModel';

const memberStore = new MemberStore();
const memberViewModel = new MemberViewModel(memberStore);

interface IMemberContext {
  model: MemberViewModel;
}
export const MemberViewModelContext = React.createContext<IMemberContext>({
  model: memberViewModel,
});

export const MemberViewModelContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemberViewModelContext.Provider value={{ model: memberViewModel }}>
      {children}
    </MemberViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useMemberViewModel = () => React.useContext(MemberViewModelContext);

/* HOC to inject store to any functional or class component */
export const withMemberViewModel = (Component: any) => (props: any) => {
  return <Component {...props} {...useMemberViewModel()} />;
};
