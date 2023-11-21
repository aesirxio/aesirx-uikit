/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { MEMBER_ROLE_FIELD } from 'aesirx-lib';
import { PAGE_STATUS } from 'constant';
import { MemberRoleStore } from '../store';
import moment from 'moment';
import { notify } from 'components';

class MemberRoleListViewModel {
  memberRoleStore: MemberRoleStore;
  formStatus = PAGE_STATUS.READY;
  memberRoleListViewModel = {};
  items = [];
  filter = {};
  successResponse: { [key: string]: any } = {
    state: false,
    content_id: '',
    listPublishStatus: [],
    1: [],
    filters: {
      'list[limit]': 10,
    },
    listMemberRoles: [],
    pagination: null,
  };

  constructor(memberRoleStore: MemberRoleStore) {
    makeAutoObservable(this);
    this.memberRoleStore = memberRoleStore;
  }

  setForm = (memberRoleListViewModel: any) => {
    this.memberRoleListViewModel = memberRoleListViewModel;
  };

  initializeData = async () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
    const data = await this.memberRoleStore.getList(this.successResponse.filters);

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getListByFilter = async (key: any, value: any) => {
    value ? (this.successResponse.filters[key] = value) : delete this.successResponse.filters[key];

    //pagination
    if (key != 'list[start]' && key != 'list[limit]') {
      delete this.successResponse.filters['list[start]'];
    } else {
      if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page >= this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['list[start]'] =
          Math.ceil(this.successResponse.pagination.totalItems / value - 1) * value;
      } else if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page < this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['list[start]'] =
          (this.successResponse.pagination.page - 1) * value;
      }
    }

    const data = await this.memberRoleStore.getList(this.successResponse.filters);

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.successResponse.state = true;
    });
  };

  onSuccessHandler = (result: any, message: any) => {
    if (result && message) {
      notify(message, 'success');
    }

    if (result?.listItems) {
      this.successResponse.listMemberRoles = this.transform(result?.listItems);
      this.successResponse.pagination = result?.pagination;
      this.items = result?.listItems;
      this.successResponse.state = true;
    }
    if (result?.listPublishStatus) {
      this.successResponse.listPublishStatus = result?.listPublishStatus;
    }
  };

  onErrorHandler = (error: any) => {
    error._messages[0]?.message
      ? notify(error._messages[0]?.message, 'error')
      : error.message && notify(error.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  transform = (data: any) => {
    return data.map((o: any) => {
      const date = moment(o[MEMBER_ROLE_FIELD.MODIFIED_TIME]).format('DD MMM, YYYY');
      return {
        member_role: {
          id: o[MEMBER_ROLE_FIELD.ID],
          name: o[MEMBER_ROLE_FIELD.NAME],
        },
        member: o[MEMBER_ROLE_FIELD.MEMBER_NAME],
        role: o[MEMBER_ROLE_FIELD.ROLE_NAME],
        organisation: o[MEMBER_ROLE_FIELD.ORGANISATION],
        lastModified: {
          status: o[MEMBER_ROLE_FIELD.PUBLISHED],
          dateTime: date ?? '',
          author: o[MEMBER_ROLE_FIELD.MODIFIED_USER_NAME],
        },
        published: {
          state: o[MEMBER_ROLE_FIELD.PUBLISHED],
          id: o[MEMBER_ROLE_FIELD.ID],
        },
      };
    });
  };

  deleteMemberRoles = async (arr: any) => {
    const data = await this.memberRoleStore.delete(arr);
    runInAction(async () => {
      if (!data?.error) {
        await this.initializeData();
        this.onSuccessHandler(data?.response, 'Deleted successfully');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.successResponse.state = true;
    });
  };

  setPublished = async ({ id, name }: any, state: any = 0) => {
    const data = await this.memberRoleStore.update({
      id: id.toString(),
      role_name: name,
      published: state.toString(),
    });
    runInAction(async () => {
      if (!data?.error) {
        await this.initializeData();
        this.onSuccessHandler(data?.response, 'Updated successfully');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  isLoading = () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
  };
}

export default MemberRoleListViewModel;
