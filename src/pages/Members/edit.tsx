/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditMember from './MemberEdit';
import { MemberViewModelContextProvider } from './MemberViewModel/MemberViewModelContextProvider';
import { MemberStore } from './store';
import MemberViewModel from './MemberViewModel/MemberViewModel';
const memberStore = new MemberStore();
const memberViewModel = new MemberViewModel(memberStore);

const EditMemberProvider = observer(
  class EditCategoMemberer extends Component {
    render() {
      return (
        <MemberViewModelContextProvider viewModel={memberViewModel}>
          <EditMember />
        </MemberViewModelContextProvider>
      );
    }
  }
);
export { EditMemberProvider };
