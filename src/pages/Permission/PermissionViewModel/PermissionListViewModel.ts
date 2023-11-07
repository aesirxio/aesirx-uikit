/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PERMISSION_FIELD } from 'aesirx-lib';
import { PAGE_STATUS } from 'constant';
import { PermissionStore } from '../store';
import { notify } from 'components';

class PermissionListViewModel {
  permissionStore: PermissionStore;
  formStatus = PAGE_STATUS.READY;
  permissionListViewModel = {};
  formPropsData = [{}];
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
    listPermission: [],
    pagination: null,
    listPermissionWithoutPagination: [],
  };

  constructor(permissionStore: PermissionStore) {
    makeAutoObservable(this);
    this.permissionStore = permissionStore;
  }

  setForm = (permissionListViewModel: any) => {
    this.permissionListViewModel = permissionListViewModel;
  };

  initializeData = async () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
    const data = await this.permissionStore.getList(this.successResponse.filters);

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
    const data = await this.permissionStore.getListWithoutPagination(this.filter);

    runInAction(() => {
      if (!data?.error) {
        this.callbackOnSuccessGetPermissionHandler(data?.response);
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

    const data = await this.permissionStore.getList(this.successResponse.filters);

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
      this.successResponse.listPermission = this.transform(result?.listItems);
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
      // const date = moment(o[PERMISSION_FIELD.MODIFIED_TIME]).format('DD MMM, YYYY');
      return {
        permission: {
          id: o[PERMISSION_FIELD.ID],
          name: o[PERMISSION_FIELD.ROLE_NAME],
        },
        create: '',
        edit: '',
        delete: '',
        subRows: Object.keys(o[PERMISSION_FIELD.RULES]).map((key) => ({
          permission: {
            id: o[PERMISSION_FIELD.ID],
            name: key ?? '',
          },
          asset_id: o[PERMISSION_FIELD.RULES][key][PERMISSION_FIELD.ASSET_ID],
          entity: o[PERMISSION_FIELD.RULES][key][PERMISSION_FIELD.ENTITY],
          group_id: o[PERMISSION_FIELD.GROUP_ID],
          create: o[PERMISSION_FIELD.RULES][key]?.permission?.create,
          edit: o[PERMISSION_FIELD.RULES][key]?.permission?.edit,
          delete: o[PERMISSION_FIELD.RULES][key]?.permission?.delete,
        })),
        // organisation: o[PERMISSION_FIELD.ORGANISATION],
        // lastModified: {
        //   status: o[PERMISSION_FIELD.PUBLISHED],
        //   dateTime: date ?? '',
        //   author: o[PERMISSION_FIELD.CREATED_USER_NAME],
        // },
        // published: {
        //   state: o[PERMISSION_FIELD.PUBLISHED],
        //   id: o[PERMISSION_FIELD.ID],
        // },
      };
    });
  };

  deletePermission = async (arr: any) => {
    const data = await this.permissionStore.delete(arr);
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
    const data = await this.permissionStore.update({
      id: id.toString(),
      permission_name: name,
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

  callbackOnSuccessGetPermissionHandler = (result: any) => {
    this.successResponse.listPermissionWithoutPagination = result?.listItems?.map((o: any) => {
      let dash = '';
      for (let index = 1; index < o.level; index++) {
        dash += '- ';
      }
      return {
        value: o?.id,
        label: `${dash}${o[PERMISSION_FIELD.ROLE_NAME]}`,
      };
    });
  };

  update = async () => {
    // this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.permissionStore.update(this.formPropsData);

    runInAction(() => {
      if (!data?.error) {
        this.onUpdateSuccessHandler(data?.response, 'Updated successfully');
      } else {
        this.onUpdateErrorHandler(data?.response);
      }
    });
    return data;
  };

  handleFormPropsData = (key: any, value: any) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.formPropsData[key], value);
      } else {
        this.formPropsData[key] = value;
      }
    }
  };

  onUpdateErrorHandler = (error: any) => {
    error._messages[0]?.message
      ? notify(error._messages[0]?.message, 'error')
      : error.message && notify(error.message, 'error');
    // this.successResponse.state = false;
    // this.formStatus = PAGE_STATUS.READY;
  };

  onUpdateSuccessHandler = (result: any, message: any) => {
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default PermissionListViewModel;
