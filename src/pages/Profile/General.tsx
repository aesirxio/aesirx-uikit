import { Spinner, renderField } from 'components';
import { Button } from 'components/Button';
import { FormDAMImage } from 'components/Form/FormDAMImage';
import { Label } from 'components/Form/FormLabel';
import { FORM_FIELD_TYPE } from 'constant/FormFieldType';

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';
import { MEMBER_FIELD_KEY, MEMBER_GET_FIELD_KEY, Storage } from 'aesirx-lib';
import { observer } from 'mobx-react';
import { useProfileContext } from './model';
import { PAGE_STATUS } from 'constant/PageStatus';
import SimpleReactValidator from 'simple-react-validator';

const ProfileGeneral = observer(() => {
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();
  const { model } = useProfileContext();
  const memberInfo = model.getData();
  const preregistration: any = Storage.getItem('preregistration') ?? '';
  // eslint-disable-next-line no-console
  console.log(model,"model");
  

  const formPropsData = {
    [MEMBER_FIELD_KEY.ID]: preregistration?.objForm?.id ?? memberInfo[MEMBER_GET_FIELD_KEY.ID],
    [MEMBER_FIELD_KEY.AVATAR_DAM]:
      preregistration?.objForm?.avatar ?? memberInfo[MEMBER_GET_FIELD_KEY.AVATAR_DAM],
    [MEMBER_FIELD_KEY.FIRST_NAME]:
      preregistration?.objForm?.first_name ??
      memberInfo[MEMBER_GET_FIELD_KEY.FULL_NAME].split(' ')[0],
    [MEMBER_FIELD_KEY.LAST_NAME]:
      preregistration?.objForm?.sur_name ??
      memberInfo[MEMBER_GET_FIELD_KEY.FULL_NAME].split(' ')[1],
    [MEMBER_FIELD_KEY.DESCRIPTION]:
      preregistration?.objForm?.description ?? memberInfo[MEMBER_GET_FIELD_KEY.DESCRIPTION],
    [MEMBER_FIELD_KEY.ORGANIZATION]:
      preregistration?.objForm?.organization ?? memberInfo[MEMBER_GET_FIELD_KEY.ORGANIZATION],
  };

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
    },
    {
      label: t('txt_last_name'),
      key: MEMBER_FIELD_KEY.LAST_NAME,
      type: FORM_FIELD_TYPE.INPUT,
      getValueSelected: formPropsData[MEMBER_FIELD_KEY.LAST_NAME],
      className: 'col-6',
      inputClassName: 'border',
    },

    {
      label: t('txt_description'),
      key: MEMBER_FIELD_KEY.DESCRIPTION,
      type: FORM_FIELD_TYPE.TEXTAREA,
      getValueSelected: formPropsData[MEMBER_FIELD_KEY.DESCRIPTION],
      className: 'col-12',
      inputClassName: 'border',
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

    setSaving(false);
  };

  const onSelectAvatar = (image: any) => {
    formPropsData[MEMBER_FIELD_KEY.AVATAR_DAM] = image;
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
