import React, { useRef, useState } from 'react';

import { FORM_FIELD_TYPE } from 'constant';
import { Storage } from 'aesirx-lib';
import { useTranslation } from 'react-i18next';
import { renderField } from 'components';
import { Form } from 'react-bootstrap';
import { Button } from 'components/Button';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { PAGE_STATUS } from 'constant/PageStatus';
import { useProfileContext } from './model';
import { observer } from 'mobx-react';
import SimpleReactValidator from 'simple-react-validator';

const ProfilePassword = observer(() => {
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();
  const { model } = useProfileContext();
  const validator = useRef(new SimpleReactValidator());

  const formPropsData = {
    id: Storage.getItem('member_id'),
    curr_password: '',
    new_password: '',
    new_checked_password: '',
  };

  const formSetting = [
    {
      label: t('txt_current_password'),
      key: 'curr_password',
      type: FORM_FIELD_TYPE.INPUT,
      value: formPropsData.curr_password,
      className: 'col-4',
      typeFormat: FORM_FIELD_TYPE.PASSWORD,
      validation: 'min:6',
      blurred: () => validator.current.showMessageFor('curr_password'),
    },
    {
      label: t('txt_new_password'),
      key: 'new_password',
      type: FORM_FIELD_TYPE.INPUT,
      value: formPropsData.new_password,
      className: 'col-4',
      typeFormat: FORM_FIELD_TYPE.PASSWORD,
      validation: 'min:6',
    },

    {
      label: t('txt_confirm_password'),
      key: 'new_checked_password',
      type: FORM_FIELD_TYPE.INPUT,
      value: formPropsData.new_checked_password,
      className: 'col-4',
      typeFormat: FORM_FIELD_TYPE.PASSWORD,
    },
  ];

  const save = async () => {
    if (validator.current.allValid()) {
      alert('You submitted the form and stuff!');
    } else {
      validator.current.showMessages();
    }

    // setSaving(true);

    // setSaving(false);
  };

  return model.formStatus === PAGE_STATUS.READY ? (
    <>
      <h2 className="text-blue-0 my-3">{t('txt_projectpage_password')}</h2>
      <div className="bg-white p-3 rounded-3">
        <Form className="row">
          {formSetting.map((field) => renderField(field, validator.current))}
        </Form>

        <div className="d-flex align-items-center col-3">
          <Button onClick={save} text={t('txt_update')} icon={faCog} loading={saving} />
        </div>
      </div>
    </>
  ) : (
    <></>
  );
});

export { ProfilePassword };
