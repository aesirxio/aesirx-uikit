import React from 'react';
import { Button, Form } from 'react-bootstrap';
import ButtonCopy from '../../../components/ButtonCopy';
import { useFormik } from 'formik';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-lib';
import { ProfileStore } from '../../Profile/store';

const Email = () => {
  const [updating, setUpdating] = useState(false);
  const profileStore = new ProfileStore();
  const preregistration: any = Storage.getItem('preregistration') ?? '';
  const userID = Storage.getItem(AUTHORIZATION_KEY.MEMBER_ID);
  const userName = Storage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL);
  console.log(preregistration, 'preregistration');
  console.log(userName);

  const formik = useFormik({
    initialValues: {
      email: userName,
    },
    onSubmit: async (values: any) => {
      let updateSuccess = true;
      setUpdating(true);
      try {
        const response: any = await profileStore.checkEmail({ id: userID, ...values });
        console.log(response, 'sdsd');

        if (response?.result?.success) {
          toast.success('Update email sucessfully!');
        } else {
          updateSuccess = false;
          toast.error('Something when wrong!');
        }
      } catch (error: any) {
        console.log('Error', error);
        updateSuccess = false;
        toast.error(error?.message);
      }
      setUpdating(false);
    },
    validateOnMount: true,
  });

  return (
    <div className="py-2rem px-4 border rounded">
      <h3 className="fw-semibold fs-18 mb-12px">Email</h3>
      <Form onSubmit={formik.handleSubmit} className="text-start">
        <Form.Group>
          <Form.Label className="fw-medium mb-12px">
            Email address<span className="text-danger">*</span>
          </Form.Label>
          <div className="position-relative fs-7 mb-12px">
            <Form.Control
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values['email']}
              className={`py-13px fs-7 ${
                formik.touched['email'] && formik.errors['email'] ? 'border-danger' : ''
              }`}
            />
            <ButtonCopy
              content={formik.values['email']}
              className="border-0 top-0 bottom-0 p-0 px-2 m-1 bg-gray-100 position-absolute end-0"
            />
          </div>
          {formik.touched['email'] && formik.errors['email'] ? (
            <p className="mt-2 fs-7 mb-12px p-0 bg-white border-0 text-danger d-flex align-items-center">
              <FontAwesomeIcon icon={faCircleExclamation} width={14} height={14} />
              <span className="fs-7 fw-semibold ms-2 lh-1">
                {formik.errors['email'].toString()}
              </span>
            </p>
          ) : null}
        </Form.Group>
        <Button
          type="submit"
          disabled={!formik.isValid || formik.values['email'] == userName || updating}
          variant="success"
          className="fw-semibold py-12px py-12px w-100"
        >
          {formik.values['email'] != userName ? 'Update Email' : 'Connected'}
        </Button>
      </Form>
    </div>
  );
};

export default Email;
