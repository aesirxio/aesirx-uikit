/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import EditPermission from './PermissionEdit';
import { PermissionViewModelContextProvider } from './PermissionViewModel/PermissionViewModelContextProvider';

const EditPermissionProvider = observer(
  class EditPermissionProvider extends Component {
    render() {
      return (
        <PermissionViewModelContextProvider>
          <EditPermission />
        </PermissionViewModelContextProvider>
      );
    }
  }
);
export { EditPermissionProvider };
