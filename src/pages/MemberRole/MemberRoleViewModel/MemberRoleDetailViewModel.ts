import { MEMBER_ROLE_FIELD } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS } from 'constant';
import { MemberRoleStore } from '../store';
import { notify } from 'components';
class MemberRoleDetailViewModel {
  memberRoleStore: MemberRoleStore;
  formStatus = PAGE_STATUS.READY;
  memberRoleDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  memberRoleList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: {},
  };

  constructor(memberRoleStore: MemberRoleStore) {
    makeAutoObservable(this);
    this.memberRoleStore = memberRoleStore;
  }

  setForm = (memberRoleDetailViewModel: any) => {
    this.memberRoleDetailViewModel = memberRoleDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.memberRoleStore.getDetail(
      this.memberRoleDetailViewModel.formPropsData[MEMBER_ROLE_FIELD.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetMemberRoleSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getMemberRoleList = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.memberRoleStore.getMemberRoleList(this.successResponse.filters);

    runInAction(() => {
      if (!data?.error) {
        this.onGetMemberRoleListSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.memberRoleStore.create(this.memberRoleDetailViewModel.formPropsData);

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
    const data = await this.memberRoleStore.update(this.memberRoleDetailViewModel.formPropsData);

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

  onGetMemberRoleSuccessHandler = (result: any) => {
    if (result && result[MEMBER_ROLE_FIELD.ID]) {
      this.memberRoleDetailViewModel.formPropsData = {
        ...this.memberRoleDetailViewModel.formPropsData,
        ...Object.keys(MEMBER_ROLE_FIELD)
          .map((index) => {
            return {
              [MEMBER_ROLE_FIELD[index]]: result[MEMBER_ROLE_FIELD[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetMemberRoleListSuccessHandler = (result: any) => {
    if (result) {
      this.memberRoleList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key: any, value: any) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.memberRoleDetailViewModel.formPropsData[key], value);
      } else {
        this.memberRoleDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value: any) => {
    this.aliasChange = value;
  };
}

export default MemberRoleDetailViewModel;
