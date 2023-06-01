/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { ORGANISATION_MEMBER_FIELD } from 'aesirx-lib';
import { PAGE_STATUS } from 'constant';
import { MemberStore } from '../store';
import moment from 'moment';
import { notify } from 'components';

class MemberListViewModel {
  memberStore: MemberStore;
  formStatus = PAGE_STATUS.READY;
  memberListViewModel = {};
  items = [];
  filter = {};
  successResponse = {
    state: false,
    content_id: '',
    listPublishStatus: [],
    1: [],
    filters: {
      'list[limit]': 10,
    },
    listMembers: [],
    pagination: null,
  };

  constructor(memberStore: MemberStore) {
    makeAutoObservable(this);
    this.memberStore = memberStore;
  }

  setForm = (memberListViewModel: any) => {
    this.memberListViewModel = memberListViewModel;
  };

  initializeData = async () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
    await this.memberStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );

    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  callbackOnSuccessHandlerCustom = (result: any) => {
    this.items = result.listItems;
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFilter = (filter: any) => {
    this.filter = { ...this.filter, ...filter };
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
    if (result?.listItems) {
      this.successResponse.listMembers = this.transform(result.listItems);
      this.successResponse.pagination = result.pagination;
      // Need improve response
      this.items = result.listItems;
    }

    if (result?.listPublishStatus) {
      this.successResponse.listPublishStatus = result.listPublishStatus;
    }
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  transform = (data: any) => {
    return data.map((o: any) => {
      const date = moment(o[ORGANISATION_MEMBER_FIELD.MODIFIED_TIME]).format('DD MMM, YYYY');
      return {
        member: {
          id: o[ORGANISATION_MEMBER_FIELD.ID],
          name: o[ORGANISATION_MEMBER_FIELD.MEMBER_NAME],
        },
        memberEmail: o[ORGANISATION_MEMBER_FIELD.MEMBER_EMAIL],
        memberRole: o[ORGANISATION_MEMBER_FIELD.MEMBER_ROLE],
        organisation: o[ORGANISATION_MEMBER_FIELD.ORGANISATION],
        lastModified: {
          status: o[ORGANISATION_MEMBER_FIELD.MEMBER_STATE],
          dateTime: date ?? '',
          author: o[ORGANISATION_MEMBER_FIELD.CREATED_USER_NAME],
        },
        published: {
          state: o[ORGANISATION_MEMBER_FIELD.MEMBER_STATE],
          id: o[ORGANISATION_MEMBER_FIELD.ID],
        },
      };
    });
  };

  deleteMembers = async (arr: any) => {
    const res = await this.memberStore.delete(
      arr,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.memberStore.getList(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler,
        this.successResponse.filters
      );
    }
    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  isLoading = () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
  };
}

export default MemberListViewModel;
