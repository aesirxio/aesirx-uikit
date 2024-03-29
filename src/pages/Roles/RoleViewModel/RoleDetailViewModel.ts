import { ORGANISATION_ROLE_FIELD } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS } from 'constant';
import { RoleStore } from '../store';
import { notify } from 'components';
class RoleDetailViewModel {
  roleStore: RoleStore;
  formStatus = PAGE_STATUS.READY;
  roleDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  roleList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: {},
  };

  constructor(roleStore: RoleStore) {
    makeAutoObservable(this);
    this.roleStore = roleStore;
  }

  setForm = (roleDetailViewModel: any) => {
    this.roleDetailViewModel = roleDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.roleStore.getDetail(
      this.roleDetailViewModel.formPropsData[ORGANISATION_ROLE_FIELD.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetRoleSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.roleStore.create(this.roleDetailViewModel.formPropsData);

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
    const data = await this.roleStore.update(this.roleDetailViewModel.formPropsData);

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

  onGetRoleSuccessHandler = (result: any) => {
    if (result && result[ORGANISATION_ROLE_FIELD.ID]) {
      this.roleDetailViewModel.formPropsData = {
        ...this.roleDetailViewModel.formPropsData,
        ...Object.keys(ORGANISATION_ROLE_FIELD)
          .map((index) => {
            return {
              [ORGANISATION_ROLE_FIELD[index]]: result[ORGANISATION_ROLE_FIELD[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetRoleListSuccessHandler = (result: any) => {
    if (result) {
      this.roleList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key: any, value: any) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.roleDetailViewModel.formPropsData[key], value);
      } else {
        this.roleDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value: any) => {
    this.aliasChange = value;
  };
}

export default RoleDetailViewModel;
