/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';

import './index.scss';

import { SSOButton } from 'aesirx-sso';
import { AesirxAuthenticationApiService, Storage } from 'aesirx-lib';
import { notify } from 'components/Toast';

import welcome from '../../assets/images/logo/welcome-logo.png';

class LoginPage extends React.Component {
  login: any;

  constructor(props: any) {
    super(props);
    this.state = {
      isProcessing: false,
    };

    this.login = props.login;
  }

  render() {
    const { t, text }: any = this.props;
    const onGetData = async (response: any) => {
      if (response.error) {
        notify(response.error_description, 'error');
      } else {
        const authService = new AesirxAuthenticationApiService();
        await authService.setTokenUser(response, false);
        Storage.setItem('auth', true);
        window.location.reload();
      }
    };
    return (
      <div className="vh-100 bg-blue-9 login-page position-relative">
        <div className="row justify-content-center align-items-center h-100 ">
          <div className="col-lg-8 col-xxl-6">
            <div className="d-block p-2 p-lg-5">
              <p className="fs-2 fw-semibold mb-2 text-center text-blue-5">
                {t('txt_welcome_to')}
                <img
                  className="pe-2"
                  style={{ verticalAlign: 'inherit' }}
                  alt="AesirX"
                  src={welcome}
                />
                {text}.
              </p>
              <p className="fs-2 fw-semibold text-center text-blue-5">
                {t('txt_sign_in_to_getting_started')}
              </p>

              <SSOButton
                className="btn-primary btn w-100 fw-bold position-relative d-flex align-item-center justify-content-center my-3  px-6"
                text={t('txt_sign_in_with_sso')}
                onGetData={onGetData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const LoginPageE = withTranslation()(LoginPage);

export { LoginPageE as LoginPage };
