/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import UtilsListViewModel from './UtilsListViewModel';
import UtilsStore from './UtilsStore';

class UtilsViewModel {
  utilsDetailViewModel = {};
  utilsListViewModel = {};

  constructor(utilsStore: UtilsStore) {
    if (utilsStore) {
      this.utilsListViewModel = new UtilsListViewModel(utilsStore);
    }
  }

  getUtilsListViewModel = () => this.utilsListViewModel;
}

export default UtilsViewModel;
