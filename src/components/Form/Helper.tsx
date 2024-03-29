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

import { FormSelection } from './FormSelection';
import { FormSelectDropdown } from './FormSelectDropdown';
import { FormRadio } from './FormRadio';
import { Input } from './Input';
import { FormEditor } from './FormEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
const renderingGroupFieldHandler = (group: any, validator: any) =>
  Object.keys(group.fields)
    .map((fieldIndex) =>
      [...Array(group.fields[fieldIndex])].map((field) => (() => renderField(field, validator))())
    )
    .reduce((arr, el) => arr.concat(el), []);

const renderField = (field: any, validator: any) => {
  const className = field.className ?? '';

  field.getValueSelected = field?.value ?? field?.getValueSelected;

  switch (field.type) {
    case FORM_FIELD_TYPE.INPUT:
      return (
        <Form.Group key={field.key} className={`mb-3 ${className}`}>
          <Label text={field.label} required={field.required ?? false} />
          <Input field={field} />
          {field.validation &&
            validator.message(field.label, field.getValueSelected, field.validation, {
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
            defaultValue={field.getValueSelected}
            required={field.required ?? false}
            id={field.key}
            onChange={field.changed ?? undefined}
            onBlur={field.blurred ?? undefined}
          />
        </Form.Group>
      );

    case FORM_FIELD_TYPE.DATERANGE:
      return <FormDateRangePicker key={Math.random()} field={field} validator={validator} />;

    case FORM_FIELD_TYPE.SELECTION:
      return (
        <Form.Group key={field.key} className={`mb-3 ${className}`}>
          {field.label && <Label text={field.label} required={field.required ?? false} />}
          <FormSelection key={Math.random()} field={field} />
          {field.validation &&
            validator.message(field.label, field.getValueSelected, field.validation, {
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
            validator.message(field.label, field.getValueSelected, field.validation, {
              className: 'text-danger',
            })}
        </Form.Group>
      );
    case FORM_FIELD_TYPE.RADIO:
      return (
        <Form.Group key={Math.random()} className={`mb-3 ${className}`}>
          <Label text={field.label} required={field.required ?? false} />
          <FormRadio field={field} />
          {field.validation &&
            validator.message(field.label, field.getValueSelected, field.validation, {
              className: 'text-danger',
            })}
        </Form.Group>
      );

    case FORM_FIELD_TYPE.BIRTHDAY:
      return (
        <Form.Group key={Math.random()} className={`mb-3 ${className}`}>
          <Label text={field.label} />
          <div className="form-control w-full">
            <CustomizedDatePicker
              handleOnChange={(date: any) => field.changed(date)}
              defaultDate={field.getValueSelected ? field.getValueSelected.split(' ')[0] : null}
            />
          </div>
        </Form.Group>
      );

    case FORM_FIELD_TYPE.AGE:
      return (
        <Form.Group key={Math.random()} className={`mb-3 ${className}`}>
          <Label text={field.label} required={field.required ?? false} />
          <FormAgeField field={field} />{' '}
          {field.validation &&
            validator.message(field.label, field.getValueSelected, field.validation, {
              className: 'text-danger',
            })}
        </Form.Group>
      );

    case FORM_FIELD_TYPE.NUMBER:
      return (
        <Form.Group key={field.key} ref={field.ref} className={`mb-24 ${className}`}>
          {field.label && (
            <div className="d-flex align-item-center">
              <Label
                text={field.label}
                isLabelHTML={field.isLabelHTML}
                required={field.required ?? false}
              />
            </div>
          )}
          <Input field={field} />
          {field.validation &&
            validator.message(field.label, field.getValueSelected, field.validation, {
              className: 'text-danger',
            })}
        </Form.Group>
      );

    case FORM_FIELD_TYPE.EDITOR:
      return (
        <Form.Group key={field.key} className={`mb-24 ${className}`}>
          <div className="d-flex align-item-center">
            {field.label && (
              <Label
                text={field.label}
                isLabelHTML={field.isLabelHTML}
                required={field.required ?? false}
              />
            )}
            {field.description && (
              <TooltipField
                keyTooltip={field?.key}
                description={field?.description}
                defaultValue={field?.default}
              />
            )}
          </div>
          {field.isEditor === false ? (
            <Form.Control
              as="textarea"
              defaultValue={field.getValueSelected}
              required={field.required ?? false}
              id={field.key}
              onChange={field.handleChange ?? undefined}
              onBlur={field.blurred ?? undefined}
              placeholder={field.placeholder}
              maxLength={field?.maxLength}
            />
          ) : (
            <FormEditor field={field} key={field.key} />
          )}
          {field.validation &&
            validator.message(field.label, field.value, field.validation, {
              className: 'text-danger',
            })}
        </Form.Group>
      );

    default:
      return <></>;
  }
};

const TooltipField = ({ keyTooltip, description, defaultValue }: any) => {
  return (
    <>
      <FontAwesomeIcon
        data-tooltip-id={`tooltip-${keyTooltip}`}
        data-tooltip-html={
          defaultValue
            ? description + `</br>Default: <strong>${defaultValue}</strong>`
            : description
        }
        className="mx-sm fs-12 mb-1"
        icon={faCircleInfo}
      />
      <Tooltip id={`tooltip-${keyTooltip}`} />
    </>
  );
};

export { renderingGroupFieldHandler, renderField };
