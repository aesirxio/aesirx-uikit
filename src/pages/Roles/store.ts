import {
  OrganizationRoleApiService,
  OrganizationRoleItemModel,
  OrganizationRoleApiService,
} from 'aesirx-lib';

class RoleStore {
  async getList(filters: any) {
    try {
      const getListAPIService = new OrganizationRoleApiService();
      const respondedData = await getListAPIService.getList(filters);
      return { error: false, response: respondedData };
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getListWithoutPagination(filters: any) {
    try {
      const getListAPIService = new OrganizationRoleApiService();
      const respondedData = await getListAPIService.getList({ ...filters, 'list[limit]': 9999 });

      return { error: false, response: respondedData };
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getDetail(id: any) {
    if (!id) return { error: false, response: false };

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new OrganizationRoleApiService();

        const respondedData = await getDetailInfoAPIService.getDetail(id);

        return { error: false, response: respondedData };
      }
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }

  async create(createFieldData: any) {
    try {
      const convertedUpdateGeneralData =
        OrganizationRoleItemModel.__transformItemToApiOfCreation(createFieldData);
      let resultOnSave: { result: '' };
      const createOrganizationApiService = new OrganizationRoleApiService();

      // eslint-disable-next-line prefer-const
      resultOnSave = await createOrganizationApiService.create(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }

  async update(updateFieldData: any) {
    try {
      const convertedUpdateGeneralData =
        OrganizationRoleItemModel.__transformItemToApiOfUpdation(updateFieldData);

      let resultOnSave: { result: '' };
      const updateOrganizationApiService = new OrganizationRoleApiService();
      // eslint-disable-next-line prefer-const
      resultOnSave = await updateOrganizationApiService.update(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }

  async delete(arr: any) {
    try {
      const aesirxOrganizationApiService = new OrganizationRoleApiService();
      const respondedData = await aesirxOrganizationApiService.delete(arr);
      return { error: false, response: respondedData };
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }
}

export { RoleStore };
