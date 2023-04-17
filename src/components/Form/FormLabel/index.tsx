/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Form } from 'react-bootstrap';

const Label = (text: any, required: any) => {
  return (
    <Form.Label className="mb-3 w-100 text-blue-0">
      {text}
      {required && <span className="text-red-1">*</span>}
    </Form.Label>
  );
};

export { Label };
