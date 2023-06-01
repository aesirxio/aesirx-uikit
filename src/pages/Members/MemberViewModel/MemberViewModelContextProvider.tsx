/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

export const MemberViewModelContext = React.createContext();

export const MemberViewModelContextProvider = ({ children, viewModel }: any) => {
  return (
    <MemberViewModelContext.Provider value={viewModel}>{children}</MemberViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useMemberViewModel = () => React.useContext(MemberViewModelContext);

/* HOC to inject store to any functional or class component */
export const withMemberViewModel = (Component: any) => (props: any) => {
  return <Component {...props} viewModel={useMemberViewModel()} />;
};
