/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { PermissionStore } from '../store';
import PermissionDetailViewModel from './PermissionDetailViewModel';
import PermissionListViewModel from './PermissionListViewModel';

class PermissionViewModel {
  permissionDetailViewModel = {};
  permissionListViewModel = {};

  constructor(permissionStore: PermissionStore) {
    if (permissionStore) {
      this.permissionDetailViewModel = new PermissionDetailViewModel(permissionStore);
      this.permissionListViewModel = new PermissionListViewModel(permissionStore);
    }
  }

  getPermissionDetailViewModel = () => this.permissionDetailViewModel;
  getPermissionListViewModel = () => this.permissionListViewModel;
}

export default PermissionViewModel;
