/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS } from 'constant/PageStatus';
import { ProfileStore } from './store';
import React, { createContext, useContext } from 'react';
import { notify } from 'components';
import { logout } from 'auth';
import { Storage } from 'aesirx-lib';

class ProfileModel {
  profileStore: ProfileStore;
  formStatus = PAGE_STATUS.READY;
  updateGeneralViewModel = null;
  data: any = {};
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(profileStore: ProfileStore) {
    makeAutoObservable(this);
    this.profileStore = profileStore;
  }

  init = async (id: number) => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.profileStore.getMember(id);

    runInAction(() => {
      if (data) {
        this.data = data;
        this.formStatus = PAGE_STATUS.READY;
      }
    });
  };

  save = async (data: any) => {
    await notify(this.profileStore.updateProfile(data), 'promise');
  };
  savePreregistration = async (jwt: any, data: any) => {
    await this.profileStore.updatePreregistration(jwt, data);
  };

  getData = () => {
    return this.data;
  };
  savePassword = async (data: any) => {
    const rs = await this.profileStore.updatePassword(data);

    runInAction(() => {
      this.successResponse.state = rs?.result?.success;
      this.successResponse.content_id = rs?.result?.content_id;
    });

    if (rs?.result?.success) {
      logout();
      notify('Change password successfully, please re-login with your new password.', 'success');
    }
  };
}

const profileStore = new ProfileStore();
const profileModel = new ProfileModel(profileStore);

interface IProfileContext {
  model: ProfileModel;
}

const ProfileContext = createContext<IProfileContext>({ model: profileModel });

const ProfileContextProvider = ({ children }: { children: React.ReactNode }) => {
  profileModel.init(parseInt(String(Storage.getItem('member_id'))));

  return (
    <ProfileContext.Provider value={{ model: profileModel }}>{children}</ProfileContext.Provider>
  );
};

const useProfileContext = () => useContext(ProfileContext);

/* HOC to inject store to any functional or class component */
const withProfileContext = (Component: any) => (props: any) => {
  return <Component {...props} {...useProfileContext()} />;
};

export { ProfileContextProvider, withProfileContext, useProfileContext };
