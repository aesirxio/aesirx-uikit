import React from 'react';
import { Image } from 'components';
import { Button, Form, Spinner } from 'react-bootstrap';
import ButtonCopy from '../../../components/ButtonCopy';
import { useState } from 'react';
import axios from 'axios';
import { notify } from 'components';
import logo_google from '../../../assets/images/logo_google.svg';
import logo_twitter from '../../../assets/images/logo_twitter.svg';
import logo_facebook from '../../../assets/images/logo_facebook.svg';

import {
  MEMBER_GET_FIELD_KEY,
  AesirxAuthenticationApiService,
  AesirxMemberApiService,
  AUTHORIZATION_KEY,
  Storage,
} from 'aesirx-lib';
import { useProfileContext } from '../../Profile/model';
const Social = ({ typeSocial, keySocial }: any) => {
  const [loading, setLoading] = useState(false);
  const { model } = useProfileContext();
  const member = new AesirxMemberApiService();
  const request = new AesirxAuthenticationApiService();
  const aesirxData = model.getData();
  const accessToken = Storage.getItem(AUTHORIZATION_KEY.ACCESS_TOKEN);

  const connectSocial = async () => {
    try {
      setLoading(true);
      const response: any = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_URL}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=getSocialConnectUrl&api=hal&socialType=${typeSocial}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );

      const popupSocial =
        response?.data.result[0] &&
        window.open(response?.data.result[0], 'SSO', 'status=1,height=750,width=650');
      let timer = setInterval(function () {
        if (popupSocial?.closed) {
          clearInterval(timer);
          setLoading(false);
        }
      }, 1000);

      window.addEventListener(
        'message',
        (e: any) => {
          if (e.origin !== process.env.REACT_APP_ENDPOINT_URL) return;
          if (e.data && e.data.socialType) {
            setLoading(false);
            request.getStore('jwt');
            Storage.getItem(AUTHORIZATION_KEY.ACCESS_TOKEN);
          } else if (e.data.error) {
            // toast.error(<Toast status={false} message={e.data.error} />);
          }
        },
        false
      );
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectSocial = async () => {
    let updateSuccess = true;
    setLoading(true);
    try {
      const response: any = await member.updateMember(
        { id: aesirxData[MEMBER_GET_FIELD_KEY.ID], [keySocial]: '' },
        accessToken
      );

      if (response?.result?.success) {
        notify('Disconnect sucessfully!', 'success');
      } else {
        updateSuccess = false;
        notify(`${response?._messages?.[0]?.message || 'Something when wrong!'} , "error"`);
      }
    } catch (error: any) {
      console.log('Error', error);
      updateSuccess = false;
      notify(`${error?.response?.data?._messages?.[0]?.message || error?.message} , "error"`);
    }
    setLoading(false);
    if (updateSuccess) {
      await request.getStore('jwt');
      await Storage.getItem(AUTHORIZATION_KEY.ACCESS_TOKEN);
    }
  };

  let logoSocial = logo_google;
  switch (typeSocial) {
    case 'facebook':
      logoSocial = logo_facebook;
      break;
    case 'twitter':
      logoSocial = logo_twitter;
      break;
  }
  return (
    <div className="py-5 px-4 border rounded">
      <div className="d-flex justify-content-start align-items-center mb-2">
        <Image
          quality={100}
          className="me-2"
          src={logoSocial}
          width={40}
          height={40}
          alt="logo social"
        />
        <h3 className="fw-semibold fs-18 mb-12px text-capitalize ms-2">{typeSocial}</h3>
      </div>
      {aesirxData[keySocial] && (
        <Form.Group>
          <Form.Label className="fw-medium mb-1">ID</Form.Label>
          <div className="position-relative fs-7 mb-1">
            <Form.Control
              type="email"
              name="email"
              value={aesirxData[keySocial]}
              className={`py-13px fs-7`}
              readOnly={true}
            />
            <ButtonCopy
              content={aesirxData[keySocial]}
              className="border-0 top-0 bottom-0 p-0 px-2 m-1 bg-gray-100 position-absolute end-0"
            />
          </div>
        </Form.Group>
      )}
      <Button
        type="button"
        variant={`${aesirxData[keySocial] ? 'danger' : 'success'}`}
        className={`fw-semibold py-12px py-12px w-100 ${aesirxData[keySocial] ? '' : 'mt-3'}`}
        onClick={() => {
          if (aesirxData[keySocial]) {
            disconnectSocial();
          } else {
            connectSocial();
          }
        }}
        disabled={loading}
      >
        {loading && <Spinner size={'sm'} className="me-1" />}
        {aesirxData[keySocial] ? (
          'Disconnect'
        ) : (
          <>
            Connect to <span className="text-capitalize">{typeSocial}</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default Social;
