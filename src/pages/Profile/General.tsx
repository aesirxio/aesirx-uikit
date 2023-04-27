import { renderingGroupFieldHandler } from 'components';
import { Button } from 'components/Button';
import { FormDAM } from 'components/Form/FormDAM';
import { Label } from 'components/Form/FormLabel';
import { FORM_FIELD_TYPE } from 'constant/FormFieldType';

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';
import { MEMBER_FIELD_KEY, MEMBER_GET_FIELD_KEY } from 'aesirx-lib';

const ProfileGeneral = ({ memberInfo = {}, saveProfile }: any) => {
  const [saving, setSaving] = useState(false);
  const validator = new SimpleReactValidator();
  const { t } = useTranslation();

  const formPropsData = {
    [MEMBER_FIELD_KEY.ID]: memberInfo[MEMBER_GET_FIELD_KEY.ID],
    [MEMBER_FIELD_KEY.USERNAME]: memberInfo[MEMBER_GET_FIELD_KEY.USERNAME],
    [MEMBER_FIELD_KEY.AVATAR_DAM]: memberInfo[MEMBER_GET_FIELD_KEY.AVATAR_DAM],
    [MEMBER_FIELD_KEY.FULL_NAME]: memberInfo[MEMBER_GET_FIELD_KEY.FULL_NAME],
    [MEMBER_FIELD_KEY.EMAIL]: memberInfo[MEMBER_GET_FIELD_KEY.EMAIL],
    [MEMBER_FIELD_KEY.BIRTHDAY]: memberInfo[MEMBER_GET_FIELD_KEY.BIRTHDAY],
    [MEMBER_FIELD_KEY.PHONE]: memberInfo[MEMBER_GET_FIELD_KEY.PHONE],
    [MEMBER_FIELD_KEY.ADDRESS]: memberInfo[MEMBER_GET_FIELD_KEY.ADDRESS],
    [MEMBER_FIELD_KEY.ADDRESS_2]: memberInfo[MEMBER_GET_FIELD_KEY.ADDRESS_2],
    [MEMBER_FIELD_KEY.ZIP_CODE]: memberInfo[MEMBER_GET_FIELD_KEY.ZIPCODE],
    [MEMBER_FIELD_KEY.CITY]: memberInfo[MEMBER_GET_FIELD_KEY.CITY],
    [MEMBER_FIELD_KEY.STATE]: memberInfo[MEMBER_GET_FIELD_KEY.STATE],
    [MEMBER_FIELD_KEY.COUNTRY]: memberInfo[MEMBER_GET_FIELD_KEY.COUNTRY],
    [MEMBER_FIELD_KEY.TIMEZONE]: memberInfo[MEMBER_GET_FIELD_KEY.TIMEZONE],
  };

  const formSetting = [
    {
      fields: [
        {
          label: t('txt_username'),
          key: MEMBER_FIELD_KEY.USERNAME,
          type: FORM_FIELD_TYPE.INPUT,
          value: formPropsData[MEMBER_FIELD_KEY.USERNAME],
          className: 'col-6',
          inputClassName: 'border',
          readOnly: true,
        },
        {
          label: t('txt_email'),
          key: MEMBER_FIELD_KEY.EMAIL,
          type: FORM_FIELD_TYPE.INPUT,
          value: formPropsData[MEMBER_FIELD_KEY.EMAIL],
          className: 'col-6',
          inputClassName: 'border',
          readOnly: true,
        },

        {
          label: t('txt_fullname'),
          key: MEMBER_FIELD_KEY.FULL_NAME,
          type: FORM_FIELD_TYPE.INPUT,
          value: formPropsData[MEMBER_FIELD_KEY.FULL_NAME],
          className: 'col-6',
          required: true,
          validation: 'required',
          inputClassName: 'border',
          changed: (event: any) => {
            formPropsData[MEMBER_FIELD_KEY.FULL_NAME] = event.target.value;
          },
        },
        {
          label: t('txt_phone'),
          key: MEMBER_FIELD_KEY.PHONE,
          type: FORM_FIELD_TYPE.INPUT,
          value: formPropsData[MEMBER_FIELD_KEY.PHONE],
          className: 'col-6',
          inputClassName: 'border',
          changed: (event: any) => {
            formPropsData[MEMBER_FIELD_KEY.PHONE] = event.target.value;
          },
        },
      ],
    },
  ];

  const save = async () => {
    setSaving(true);
    await saveProfile(formPropsData);
    setSaving(false);
  };

  const onSelectAvatar = (image: any) => {
    formPropsData[MEMBER_FIELD_KEY.AVATAR_DAM] = image;
  };

  return (
    <>
      <div className="bg-white p-3 rounded-3">
        <div className="row">
          <div className="col-9">
            <Form className="row">
              {Object.keys(formSetting)
                .map((groupIndex: any) => {
                  return [...Array(formSetting[groupIndex])].map((group) => {
                    return renderingGroupFieldHandler(group, validator);
                  });
                })
                .reduce((arr, el) => {
                  return arr.concat(el);
                }, [])}
            </Form>
          </div>

          <div className="col-3">
            <Form.Group key={Math.random()} className={`mb-3 `}>
              <Label text={t('txt_your_avatar')} required={false} />
            </Form.Group>

            <FormDAM
              onChoose={onSelectAvatar}
              current={formPropsData[MEMBER_FIELD_KEY.AVATAR_DAM]}
            />
          </div>
          <div className="d-flex align-items-center col-3">
            <Button onClick={save} text={t('txt_update')} icon={faUserCog} loading={saving} />
          </div>
        </div>
      </div>
    </>
  );
};
export { ProfileGeneral };
