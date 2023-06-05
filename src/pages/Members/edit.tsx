/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditMember from './MemberEdit';
import { MemberViewModelContextProvider } from './MemberViewModel/MemberViewModelContextProvider';

const EditMemberProvider = observer(
  class EditMemberProvider extends Component {
    render() {
      return (
        <MemberViewModelContextProvider>
          <EditMember />
        </MemberViewModelContextProvider>
      );
    }
  }
);
export { EditMemberProvider };
