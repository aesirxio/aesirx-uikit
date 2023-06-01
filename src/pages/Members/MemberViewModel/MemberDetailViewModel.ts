import { ORGANISATION_MEMBER_FIELD } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS } from 'constant';
import { MemberStore } from '../store';
import { notify } from 'components';
class MemberDetailViewModel {
  memberStore: MemberStore;
  formStatus = PAGE_STATUS.READY;
  memberDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  roleList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: {},
  };

  constructor(memberStore: MemberStore) {
    makeAutoObservable(this);
    this.memberStore = memberStore;
  }

  setForm = (memberDetailViewModel: any) => {
    this.memberDetailViewModel = memberDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.memberStore.getDetail(
      this.memberDetailViewModel.formPropsData[ORGANISATION_MEMBER_FIELD.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetMemberSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getRoleList = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.memberStore.getRoleList(this.successResponse.filters);

    runInAction(() => {
      if (!data?.error) {
        this.onGetRoleListSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.memberStore.create(this.memberDetailViewModel.formPropsData);

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
    const data = await this.memberStore.update(this.memberDetailViewModel.formPropsData);

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

  onGetMemberSuccessHandler = (result: any) => {
    if (result) {
      this.memberDetailViewModel.formPropsData = {
        ...this.memberDetailViewModel.formPropsData,
        ...Object.keys(ORGANISATION_MEMBER_FIELD)
          .map((index) => {
            return {
              [ORGANISATION_MEMBER_FIELD[index]]: result[ORGANISATION_MEMBER_FIELD[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
    }

    this.formStatus = PAGE_STATUS.READY;
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
        Object.assign(this.memberDetailViewModel.formPropsData[key], value);
      } else {
        this.memberDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value: any) => {
    this.aliasChange = value;
  };
}

export default MemberDetailViewModel;
