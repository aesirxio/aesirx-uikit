/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { MemberRoleStore } from '../store';
import MemberRoleDetailViewModel from './MemberRoleDetailViewModel';
import MemberRoleListViewModel from './MemberRoleListViewModel';

class MemberRoleViewModel {
  memberRoleDetailViewModel = {};
  memberRoleListViewModel = {};

  constructor(memberRoleStore: MemberRoleStore) {
    if (memberRoleStore) {
      this.memberRoleDetailViewModel = new MemberRoleDetailViewModel(memberRoleStore);
      this.memberRoleListViewModel = new MemberRoleListViewModel(memberRoleStore);
    }
  }

  getMemberRoleDetailViewModel = () => this.memberRoleDetailViewModel;
  getMemberRoleListViewModel = () => this.memberRoleListViewModel;
}

export default MemberRoleViewModel;
