/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { PAGE_STATUS } from 'constant';
import { makeAutoObservable, runInAction } from 'mobx';
import UtilsStore from './UtilsStore';
import { notify } from 'components';
class UtilsListViewModel {
  utilsStore: UtilsStore;
  formStatus = PAGE_STATUS.READY;
  utilsListViewModel = null;
  listPublishStatus = [];
  listPublishStatusSimple = [];
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
    const data = await this.utilsStore.getListPublishStatus();
    runInAction(() => {
      if (!data?.error) {
        this.callbackOnSuccessHandler(data?.response);
      } else {
        this.callbackOnErrorHandler(data?.response);
      }
    });
  };
  getListContentType = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.utilsStore.getListContentType();
    runInAction(() => {
      if (!data?.error) {
        this.callbackOnSuccessHandler(data?.response);
      } else {
        this.callbackOnErrorHandler(data?.response);
      }
    });
  };
  getListFieldType = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.utilsStore.getListFieldType();
    runInAction(() => {
      if (!data?.error) {
        this.callbackOnSuccessHandler(data?.response);
      } else {
        this.callbackOnErrorHandler(data?.response);
      }
    });
  };

  callbackOnErrorHandler = (error: any) => {
    notify('Something went wrong from Server response', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result: any) => {
    if (result?.listPublishStatus) {
      this.listPublishStatus = result.listPublishStatus;
      this.listPublishStatusSimple = result.listPublishStatus.filter((obj: any) => {
        return obj.value === 0 || obj.value === 1;
      });
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
