import { PERMISSION_FIELD } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS } from 'constant';
import { PermissionStore } from '../store';
import { notify } from 'components';
class PermissionDetailViewModel {
  permissionStore: PermissionStore;
  formStatus = PAGE_STATUS.READY;
  permissionDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  permissionList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: {},
  };

  constructor(permissionStore: PermissionStore) {
    makeAutoObservable(this);
    this.permissionStore = permissionStore;
  }

  setForm = (permissionDetailViewModel: any) => {
    this.permissionDetailViewModel = permissionDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.permissionStore.getDetail(
      this.permissionDetailViewModel.formPropsData[PERMISSION_FIELD.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetPermissionSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.permissionStore.create(this.permissionDetailViewModel.formPropsData);

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, 'Created successfully');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
    return data;
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.permissionStore.update(this.permissionDetailViewModel.formPropsData);

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, 'Updated successfully');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
    return data;
  };

  onErrorHandler = (error: any) => {
    error._messages[0]?.message
      ? notify(error._messages[0]?.message, 'error')
      : error.message && notify(error.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  onSuccessHandler = (result: any, message: any) => {
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetPermissionSuccessHandler = (result: any) => {
    if (result && result[PERMISSION_FIELD.ID]) {
      this.permissionDetailViewModel.formPropsData = {
        ...this.permissionDetailViewModel.formPropsData,
        ...Object.keys(PERMISSION_FIELD)
          .map((index) => {
            return {
              [PERMISSION_FIELD[index]]: result[PERMISSION_FIELD[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetPermissionListSuccessHandler = (result: any) => {
    if (result) {
      this.permissionList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key: any, value: any) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.permissionDetailViewModel.formPropsData[key], value);
      } else {
        this.permissionDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value: any) => {
    this.aliasChange = value;
  };
}

export default PermissionDetailViewModel;
