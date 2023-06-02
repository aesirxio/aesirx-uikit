/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimUtilApiService } from 'aesirx-lib';

export default class UtilsStore {
  async getListPublishStatus() {
    try {
      const getAesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await getAesirxPimUtilApiService.getListPublishStatus();
      return { error: false, response: respondedData };
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }
  async getListContentType() {
    try {
      const getAesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await getAesirxPimUtilApiService.getListContentType();
      return { error: false, response: respondedData };
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }
  async getListFieldType() {
    try {
      const getAesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await getAesirxPimUtilApiService.getListFieldType();
      return { error: false, response: respondedData };
      return respondedData;
    } catch (error: any) {
      return { error: true, response: error?.response?.data };
    }
  }
}
