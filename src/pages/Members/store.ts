import {
  OrganizationMemberApiService,
  OrganizationMemberItemModel,
  OrganizationRoleApiService,
} from 'aesirx-lib';

class MemberStore {
  async getList(filters: any) {
    try {
      const getListAPIService = new OrganizationMemberApiService();
      const respondedData = await getListAPIService.getList(filters);
      return { error: false, response: respondedData };
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getRoleList(filters: any) {
    try {
      const getListAPIService = new OrganizationRoleApiService();
      const respondedData = await getListAPIService.getList(filters);
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
        const getDetailInfoAPIService = new OrganizationMemberApiService();

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
        OrganizationMemberItemModel.__transformItemToApiOfCreation(createFieldData);
      let resultOnSave: { result: '' };
      const createOrganizationApiService = new OrganizationMemberApiService();

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
        OrganizationMemberItemModel.__transformItemToApiOfUpdation(updateFieldData);

      let resultOnSave: { result: '' };
      const updateOrganizationApiService = new OrganizationMemberApiService();
      // eslint-disable-next-line prefer-const
      resultOnSave = await updateOrganizationApiService.update(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }

  async delete(arr: any) {
    try {
      const aesirxOrganizationApiService = new OrganizationMemberApiService();
      const respondedData = await aesirxOrganizationApiService.delete(arr);
      return { error: false, response: respondedData };
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }
}

export { MemberStore };
