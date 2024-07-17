/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

import { SSOButton, EmailLogin } from 'aesirx-sso';
import { AesirxAuthenticationApiService, Storage } from 'aesirx-lib';
import { notify } from 'components/Toast';
import { env } from 'aesirx-lib';
import { Spinner } from 'components/Spinner';
import axios from 'axios';

const LoginPage = ({ text, loginEmail }: any) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const getPreregistration = async (jwt: any) => {
    return await axios.get(
      `${
        env.REACT_APP_WEB3_API_ENDPOINT ?? 'https://web3id.backend.aesirx.io:8001'
      }/preregistration/aesirx`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  };

  const onGetData = async (response: any) => {
    setLoading(true);
    if (response.error) {
      notify(response.error_description, 'error');
    } else {
      const authService = new AesirxAuthenticationApiService();
      await authService.setTokenUser(response, false);
      try {
        const preregistration = response?.jwt && (await getPreregistration(response?.jwt));
        Storage.setItem('preregistration', preregistration?.data);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      Storage.setItem('auth', true);
      setLoading(false);
      window.location.reload();
    }
  };
  let version = '';
  try {
    version = VERSION;
  } catch (error) {
    /* empty */
  }

  return (
    <div className="vh-100 bg-blue-9 login-page position-relative">
      <div className="row justify-content-center align-items-center h-100 ">
        <div className="col-lg-8 col-xxl-6">
          <div className="d-block p-2 p-lg-5">
            <p className="fs-2 fw-semibold mb-2 text-center text-blue-5">
              {t('txt_welcome_to')}
              AesirX {text}
            </p>
            <p className="fs-2 fw-semibold text-center text-blue-5">
              {t('txt_sign_in_to_getting_started')}
            </p>
            <div className="position-relative mt-24">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {loginEmail ? (
                    <div className="w-100 w-lg-50 mx-auto">
                      <EmailLogin
                        onGetData={onGetData}
                        demoUser={env.REACT_APP_DEMO_USER ?? ''}
                        demoPassword={env.REACT_APP_DEMO_PASSWORD ?? ''}
                      />
                    </div>
                  ) : (
                    <SSOButton
                      className="btn-success btn w-100 w-lg-50 w-xxl-40 mx-auto fw-semibold position-relative d-flex align-item-center justify-content-center my-3 px-4"
                      text={t('txt_sign_in_with_sso')}
                      onGetData={onGetData}
                      demoUser={env.REACT_APP_DEMO_USER ?? ''}
                      demoPassword={env.REACT_APP_DEMO_PASSWORD ?? ''}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {version && (
          <span className="version mb-2 text text-body fs-14 position-absolute bottom-0 w-100 text-center">
            {t('txt_version')} {version}
          </span>
        )}
      </div>
    </div>
  );
};

export { LoginPage };
