/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { ORGANISATION_ROLE_FIELD } from 'aesirx-lib';
import { PAGE_STATUS } from 'constant';
import { RoleStore } from '../store';
import moment from 'moment';
import { notify } from 'components';

class RoleListViewModel {
  roleStore: RoleStore;
  formStatus = PAGE_STATUS.READY;
  roleListViewModel = {};
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
    listRoles: [],
    pagination: null,
    listRolesWithoutPagination: [],
  };

  constructor(roleStore: RoleStore) {
    makeAutoObservable(this);
    this.roleStore = roleStore;
  }

  setForm = (roleListViewModel: any) => {
    this.roleListViewModel = roleListViewModel;
  };

  initializeData = async () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
    const data = await this.roleStore.getList(this.successResponse.filters);

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  initializeAllData = async () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
    const data = await this.roleStore.getListWithoutPagination(this.filter);

    runInAction(() => {
      if (!data?.error) {
        this.callbackOnSuccessGetRolesHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
      this.successResponse.state = true;
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

    const data = await this.roleStore.getList(this.successResponse.filters);

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
      this.successResponse.listRoles = this.transform(result?.listItems);
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
      const date = moment(o[ORGANISATION_ROLE_FIELD.MODIFIED_TIME]).format('DD MMM, YYYY');
      return {
        role: {
          id: o[ORGANISATION_ROLE_FIELD.ID],
          name: o[ORGANISATION_ROLE_FIELD.ROLE_NAME],
        },
        organisation: o[ORGANISATION_ROLE_FIELD.ORGANISATION],
        lastModified: {
          status: o[ORGANISATION_ROLE_FIELD.PUBLISHED],
          dateTime: date ?? '',
          author: o[ORGANISATION_ROLE_FIELD.CREATED_USER_NAME],
        },
        published: {
          state: o[ORGANISATION_ROLE_FIELD.PUBLISHED],
          id: o[ORGANISATION_ROLE_FIELD.ID],
        },
      };
    });
  };

  deleteRoles = async (arr: any) => {
    const data = await this.roleStore.delete(arr);
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
    const data = await this.roleStore.update({
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

  callbackOnSuccessGetRolesHandler = (result: any) => {
    this.successResponse.listRolesWithoutPagination = result?.listItems?.map((o: any) => {
      let dash = '';
      for (let index = 1; index < o.level; index++) {
        dash += '- ';
      }
      return {
        value: o?.id,
        label: `${dash}${o[ORGANISATION_ROLE_FIELD.ROLE_NAME]}`,
      };
    });
  };
}

export default RoleListViewModel;
