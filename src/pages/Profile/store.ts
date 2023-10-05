import { AesirxMemberApiService } from 'aesirx-lib';

class ProfileStore {
  async updateProfile(data: any) {
    try {
      const updateGeneralApiService = new AesirxMemberApiService();

      return await updateGeneralApiService.updateMember(data);
    } catch (error) {
      return false;
    }
  }
  async updatePreregistration(jwt: any, data: any) {
    try {
      const updateGeneralApiService = new AesirxMemberApiService();

      return await updateGeneralApiService.updatePreregistration(jwt, data);
    } catch (error) {
      return false;
    }
  }

  async getMember(id: number) {
    if (!id) return null;

    try {
      const getMemberInfoAPIService = new AesirxMemberApiService();
      return await getMemberInfoAPIService.getMemberInfo(id);
    } catch (error) {
      return null;
    }
  }
  async getMemberWeb3(jwt: any) {
    try {
      const getMemberInfoAPIService = new AesirxMemberApiService();
      return await getMemberInfoAPIService.getPreregistration(jwt);
    } catch (error) {
      return null;
    }
  }

  async updatePassword(data: any) {
    try {
      const updatePasswordApiService = new AesirxMemberApiService();
      return await updatePasswordApiService.updateMemberPassword(data);
    } catch (error) {
      return error;
    }
  }
  async checkEmail(data: any) {
    if (!data) return false;

    try {
      const CheckEmailAPIService = new AesirxMemberApiService();
      const respondedData = await CheckEmailAPIService.checkEmail(data);

      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }
}

export { ProfileStore };
