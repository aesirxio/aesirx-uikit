/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { FORM_FIELD_TYPE } from 'constant';
import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ field }: any) => {
  const handleChange = (e: any) => {
    if (Object.prototype.hasOwnProperty.call(field, 'changed')) {
      e.target.value = e.target.value.normalize('NFKC');
      field.changed(e);
    }
  };

  return (
    <>
      <Form.Control
        as="input"
        defaultValue={field.value ?? ''}
        type={
          field.typeFormat
            ? field.typeFormat == FORM_FIELD_TYPE.PASSWORD
              ? 'password'
              : 'text'
            : 'text'
        }
        autoComplete={field.autoComplete === false ? 'new-password' : ''}
        required={field.required ?? false}
        id={field.key}
        onChange={(e) => handleChange(e)}
        onPaste={field.pasted ?? undefined}
        className={field.classNameInput ?? ''}
        onBlur={field.blurred ?? undefined}
        placeholder={field.placeholder ?? undefined}
        readOnly={field.readOnly}
        disabled={field.disabled}
      />
    </>
  );
};

export { Input };
