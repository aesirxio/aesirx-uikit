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

  async getMember(id: number) {
    if (!id) return null;

    try {
      const getMemberInfoAPIService = new AesirxMemberApiService();
      return await getMemberInfoAPIService.getMemberInfo(id);
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
}

export { ProfileStore };
