/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditMemberRole from './MemberRoleEdit';
import { MemberRoleViewModelContextProvider } from './MemberRoleViewModel/MemberRoleViewModelContextProvider';

const EditMemberRoleProvider = observer(
  class EditMemberRoleProvider extends Component {
    render() {
      return (
        <MemberRoleViewModelContextProvider>
          <EditMemberRole />
        </MemberRoleViewModelContextProvider>
      );
    }
  }
);
export { EditMemberRoleProvider };
