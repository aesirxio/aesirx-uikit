/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Form } from 'react-bootstrap';

import { FORM_FIELD_TYPE } from '../../constant/FormFieldType';

import { Label } from 'components/Form/FormLabel';
import { FormAgeField } from './FormAgeField';
import { FormDateRangePicker } from './FormDateRangePicker';
import { CustomizedDatePicker } from '../CustomizedDatePicker';
import { FormImage } from './FormImage';
import { FormSelection } from './FormSelection';
import { FormSelectDropdown } from './FormSelectDropdown';
import { FormRadio } from './FormRadio';
import { Input } from './Input';

const renderingGroupFieldHandler = (group: any, validator: any) => {
  return Object.keys(group.fields)
    .map((fieldIndex) => {
      return [...Array(group.fields[fieldIndex])].map((field) => {
        return (() => {
          let className = field.className ? field.className : '';
          switch (field.type) {
            case FORM_FIELD_TYPE.INPUT:
              return (
                <Form.Group key={field.key} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <Input field={field} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.TEXTAREA:
              return (
                <Form.Group key={field.key} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <Form.Control
                    as="textarea"
                    defaultValue={field.value}
                    required={field.required ?? false}
                    id={field.key}
                    onChange={field.changed ?? undefined}
                    onBlur={field.blurred ?? undefined}
                  />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.DATERANGE:
              return (
                <FormDateRangePicker key={Math.random()} field={field} validator={validator} />
              );
            case FORM_FIELD_TYPE.IMAGE:
              return (
                <Form.Group key={Math.random()} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />

                  <FormImage key={Math.random()} field={field} />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.SELECTION:
              return (
                <Form.Group key={Math.random()} className={`mb-3 ${className}`}>
                  {field.label && <Label text={field.label} required={field.required ?? false} />}

                  <FormSelection key={Math.random()} field={field} />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.DROPDOWN:
              return (
                <Form.Group key={Math.random()} className={`mb-3 ${className}`}>
                  {field.label && <Label text={field.label} required={field.required ?? false} />}
                  <FormSelectDropdown field={field} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.RADIO:
              return (
                <Form.Group key={Math.random()} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <FormRadio field={field} />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.BIRTHDAY:
              return (
                <Form.Group key={Math.random()} className={`mb-3 ${className}`}>
                  <Label text={field.label} />
                  <div className="form-control w-full">
                    <CustomizedDatePicker
                      handleOnChange={(date: any) => field.changed(date)}
                      defaultDate={field.value ? field.value.split(' ')[0] : null}
                    />
                  </div>
                </Form.Group>
              );

            case FORM_FIELD_TYPE.AGE:
              return (
                <Form.Group key={Math.random()} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <FormAgeField field={field} />
                  {field.validation &&
                    validator.message(field.label, field.valueFrom, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            default:
              return null;
          }
        })();
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
};

export { renderingGroupFieldHandler };
