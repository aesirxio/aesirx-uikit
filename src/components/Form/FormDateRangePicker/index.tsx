/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';

import { Form } from 'react-bootstrap';

import { FORMAT_DATE } from 'aesirx-lib';
import { Label } from '../FormLabel';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';

const FormDateRangePicker = ({ field, validator }: any) => {
  const { startField, endField } = field;

  const [startDate, setStartDate] = useState(startField.value && new Date(startField.value));
  const [endDate, setEndDate] = useState(endField.value && new Date(endField.value));

  const handleStartDate = (date: any) => {
    setStartDate(date);
    startField.changed(date);
    startField.value = date;
  };

  const handleEndDate = (date: any) => {
    setEndDate(date);
    endField.changed(date);
    endField.value = date;
  };
  return (
    <>
      <Form.Group className="mb-3">
        <Label text={startField.label} required={startField.required ?? false} />
        <DatePicker
          dateFormat={FORMAT_DATE}
          selected={startDate}
          onChange={(date: any) => handleStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="form-control"
          readOnly={startField.readOnly}
          minDate={new Date()}
        />
        {startField.validation &&
          validator.message(startField.label, startField.value, startField.validation, {
            className: 'text-danger',
          })}
      </Form.Group>
      <Form.Group className="mb-3">
        <Label text={endField.label} required={endField.required ?? false} />
        <DatePicker
          dateFormat={FORMAT_DATE}
          selected={endDate}
          onChange={(date: any) => handleEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          readOnly={endField.readOnly}
          className="form-control"
        />
        {endField.validation &&
          validator.message(endField.label, endField.value, endField.validation, {
            className: 'text-danger',
          })}
      </Form.Group>
    </>
  );
};

export { FormDateRangePicker };
