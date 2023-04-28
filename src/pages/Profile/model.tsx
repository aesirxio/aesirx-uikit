/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS } from 'constant/PageStatus';
import { ProfileStore } from './store';
import React, { createContext, useContext } from 'react';
import { Storage } from 'aesirx-lib';
import { notify } from 'components';

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
      this.data = data;
      this.formStatus = PAGE_STATUS.READY;
    });
  };

  save = async (data: any) => {
    await notify(this.profileStore.updateProfile(data), 'promise');
  };

  getData = () => {
    return this.data;
  };
}

const profileStore = new ProfileStore();
const profileModel = new ProfileModel(profileStore);

interface IProfileContext {
  model: ProfileModel;
}

const ProfileContext = createContext<IProfileContext>({ model: profileModel });

const ProfileContextProvider = ({ children }: { children: React.ReactNode }) => {
  //profileModel.init(parseInt(Storage.getItem('member_id') || '0'));

  return (
    <ProfileContext.Provider value={{ model: profileModel }}>{children}</ProfileContext.Provider>
  );
};

const useProfileContext = () => useContext(ProfileContext);

/* HOC to inject store to any functional or class component */
const withThemeContext = (Component: any) => (props: any) => {
  return <Component {...props} {...useProfileContext()} />;
};

export { ProfileContextProvider, withThemeContext, useProfileContext };
