import { ORGANISATION_MEMBER_FIELD } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
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
    await this.memberStore.getDetail(
      this.memberDetailViewModel.formPropsData[ORGANISATION_MEMBER_FIELD.ID],
      this.callbackOnGetMemberSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  getRoleList = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.memberStore.getRoleList(
      this.callbackOnGetRoleListSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );
  };

  create = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return this.memberStore.create(
      this.memberDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.memberStore.update(
      this.memberDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error: any) => {
    error._messages[0]?.message
      ? notify(error._messages[0]?.message, 'error')
      : error.message && notify(error.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result: any, message: any) => {
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetMemberSuccessHandler = (result: any) => {
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

  callbackOnGetRoleListSuccessHandler = (result: any) => {
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
