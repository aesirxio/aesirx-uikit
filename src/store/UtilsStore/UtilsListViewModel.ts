/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { PAGE_STATUS } from 'constant';
import { makeAutoObservable } from 'mobx';
import UtilsStore from './UtilsStore';
import { notify } from 'components';
class UtilsListViewModel {
  utilsStore: UtilsStore;
  formStatus = PAGE_STATUS.READY;
  utilsListViewModel = null;
  listPublishStatus = [];
  listContentType = [];
  listFieldType = [];
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(utilsStore: UtilsStore) {
    makeAutoObservable(this);
    this.utilsStore = utilsStore;
  }

  setForm = (utilsListViewModel: any) => {
    this.utilsListViewModel = utilsListViewModel;
  };

  getListPublishStatus = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.utilsStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };
  getListContentType = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.utilsStore.getListContentType(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };
  getListFieldType = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.utilsStore.getListFieldType(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error: any) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnCreateSuccessHandler = (result: any) => {
    if (result) {
      notify('Create successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result: any) => {
    if (result?.listPublishStatus) {
      this.listPublishStatus = result.listPublishStatus;
    }
    if (result?.listContentType) {
      this.listContentType = result.listContentType;
    }
    if (result?.listFieldType) {
      const usableFields = [
        'aesir_dam_asset',
        'checkbox',
        'editor',
        'radio',
        'number',
        'select',
        'text',
      ];
      this.listFieldType = result.listFieldType?.filter((item: any) => {
        return usableFields?.includes(item?.value);
      });
    }
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default UtilsListViewModel;
