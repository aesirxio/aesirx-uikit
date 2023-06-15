/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { MemberStore } from '../store';
import MemberDetailViewModel from './MemberDetailViewModel';
import MemberListViewModel from './MemberListViewModel';

class MemberViewModel {
  memberDetailViewModel = {};
  memberListViewModel = {};

  constructor(memberStore: MemberStore) {
    if (memberStore) {
      this.memberDetailViewModel = new MemberDetailViewModel(memberStore);
      this.memberListViewModel = new MemberListViewModel(memberStore);
    }
  }

  getMemberDetailViewModel = () => this.memberDetailViewModel;
  getMemberListViewModel = () => this.memberListViewModel;
}

export default MemberViewModel;
