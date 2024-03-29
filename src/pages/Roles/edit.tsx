/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditRole from './RoleEdit';
import { RoleViewModelContextProvider } from './RoleViewModel/RoleViewModelContextProvider';

const EditRoleProvider = observer(
  class EditRoleProvider extends Component {
    render() {
      return (
        <RoleViewModelContextProvider>
          <EditRole />
        </RoleViewModelContextProvider>
      );
    }
  }
);
export { EditRoleProvider };
