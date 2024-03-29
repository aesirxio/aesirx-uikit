/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { RoleStore } from '../store';
import RoleDetailViewModel from './RoleDetailViewModel';
import RoleListViewModel from './RoleListViewModel';

class RoleViewModel {
  roleDetailViewModel = {};
  roleListViewModel = {};

  constructor(roleStore: RoleStore) {
    if (roleStore) {
      this.roleDetailViewModel = new RoleDetailViewModel(roleStore);
      this.roleListViewModel = new RoleListViewModel(roleStore);
    }
  }

  getRoleDetailViewModel = () => this.roleDetailViewModel;
  getRoleListViewModel = () => this.roleListViewModel;
}

export default RoleViewModel;
