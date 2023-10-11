import { Spinner, renderField } from 'components';
import { Button } from 'components/Button';
import { FormDAMImage } from 'components/Form/FormDAMImage';
import { Label } from 'components/Form/FormLabel';
import { FORM_FIELD_TYPE } from 'constant/FormFieldType';

import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';
import { MEMBER_FIELD_KEY, MEMBER_GET_FIELD_KEY, AesirxAuthenticationApiService } from 'aesirx-lib';
import { observer } from 'mobx-react';
import { useProfileContext } from './model';
import { PAGE_STATUS } from 'constant/PageStatus';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';

type FormPropsData = {
  [key in MEMBER_FIELD_KEY]: string; // eslint-disable-line
};

const ProfileGeneral = observer(() => {
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();
  const { model } = useProfileContext();
  const request = new AesirxAuthenticationApiService();
  const memberInfo = model.getData();
  const jwt = request.getStore('jwt');

  const [formPropsData, setFormPropsData] = useState<FormPropsData>({
    [MEMBER_FIELD_KEY.ID]: '',
    [MEMBER_FIELD_KEY.AVATAR_DAM]: '',
    [MEMBER_FIELD_KEY.FIRST_NAME]: '',
    [MEMBER_FIELD_KEY.LAST_NAME]: '',
    [MEMBER_FIELD_KEY.DESCRIPTION]: '',
    [MEMBER_FIELD_KEY.ORGANIZATION]: '',
  });

  const getPreregistration = async (jwt: string) => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_WEB3_API_ENDPOINT || 'https://web3id.backend.aesirx.io:8001'
        }/preregistration/aesirx`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt,
          },
        }
      );
      return response.data.objForm;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const preregistrationData = await getPreregistration(jwt);

      setFormPropsData({
        [MEMBER_FIELD_KEY.ID]: preregistrationData?.id ?? memberInfo[MEMBER_GET_FIELD_KEY.ID],
        [MEMBER_FIELD_KEY.AVATAR_DAM]:
          preregistrationData?.avatar ?? memberInfo[MEMBER_GET_FIELD_KEY.AVATAR_DAM],
        [MEMBER_FIELD_KEY.FIRST_NAME]:
          preregistrationData?.first_name ?? memberInfo[MEMBER_GET_FIELD_KEY.FIRST_NAME],
        [MEMBER_FIELD_KEY.LAST_NAME]:
          preregistrationData?.sur_name ?? memberInfo[MEMBER_GET_FIELD_KEY.LAST_NAME],
        [MEMBER_FIELD_KEY.DESCRIPTION]:
          preregistrationData?.description ?? memberInfo[MEMBER_GET_FIELD_KEY.DESCRIPTION],
        [MEMBER_FIELD_KEY.ORGANIZATION]:
          preregistrationData?.organization ?? memberInfo[MEMBER_GET_FIELD_KEY.ORGANIZATION],
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formSetting = [
    {
      label: 'ID',
      key: MEMBER_FIELD_KEY.ID,
      type: FORM_FIELD_TYPE.INPUT,
      getValueSelected: formPropsData[MEMBER_FIELD_KEY.ID],
      className: 'col-12',
      inputClassName: 'border',
      readOnly: true,
    },
    {
      label: t('txt_first_name'),
      key: MEMBER_FIELD_KEY.FIRST_NAME,
      type: FORM_FIELD_TYPE.INPUT,
      getValueSelected: formPropsData[MEMBER_FIELD_KEY.FIRST_NAME],
      className: 'col-6',
      inputClassName: 'border',
      handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormPropsData({
          ...formPropsData,
          [MEMBER_FIELD_KEY.FIRST_NAME]: event.target.value,
        });
      },
    },
    {
      label: t('txt_last_name'),
      key: MEMBER_FIELD_KEY.LAST_NAME,
      type: FORM_FIELD_TYPE.INPUT,
      getValueSelected: formPropsData[MEMBER_FIELD_KEY.LAST_NAME],
      className: 'col-6',
      inputClassName: 'border',
      handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormPropsData({
          ...formPropsData,
          [MEMBER_FIELD_KEY.LAST_NAME]: event.target.value,
        });
      },
    },
    {
      label: t('txt_organization'),
      key: MEMBER_FIELD_KEY.ORGANIZATION,
      type: FORM_FIELD_TYPE.INPUT,
      getValueSelected: formPropsData[MEMBER_FIELD_KEY.ORGANIZATION],
      className: 'col-12',
      inputClassName: 'border',
      readOnly: true,
    },
  ];

  const validator = new SimpleReactValidator();

  const save = async () => {
    setSaving(true);
    await model.save(formPropsData);
    await model.savePreregistration(jwt, formPropsData);
    setSaving(false);
  };

  const onSelectAvatar = (image: string) => {
    setFormPropsData({
      ...formPropsData,
      [MEMBER_FIELD_KEY.AVATAR_DAM]: image,
    });
  };

  return (
    <>
      <div className="bg-white p-3 rounded-3">
        <div className="row">
          {model.formStatus === PAGE_STATUS.LOADING ? (
            <Spinner />
          ) : (
            <>
              <div className="col-9">
                <Form className="row">
                  {formSetting.map((field) => renderField(field, validator))}
                </Form>
              </div>

              <div className="col-3">
                <Form.Group key={Math.random()} className={`mb-3 `}>
                  <Label text={t('txt_your_avatar')} required={false} />
                </Form.Group>

                <FormDAMImage
                  onChoose={onSelectAvatar}
                  current={formPropsData[MEMBER_FIELD_KEY.AVATAR_DAM]}
                />
              </div>
              <div className="d-flex align-items-center col-3">
                <Button onClick={save} text={t('txt_update')} icon={faUserCog} loading={saving} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
});

export { ProfileGeneral };
