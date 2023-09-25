import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import ButtonCopy from '../../../components/ButtonCopy';
import { useFormik } from 'formik';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import {
  AUTHORIZATION_KEY,
  Storage,
  AesirxMemberApiService,
  MEMBER_GET_FIELD_KEY,
} from 'aesirx-lib';
import { Image } from 'components';
import mail_logo from '../../../assets/images/mail_logo.png';
import { notify } from 'components';
import { useProfileContext } from '../../Profile/model';

const Email = () => {
  const [updating, setUpdating] = useState(false);
  const member = new AesirxMemberApiService();
  const { model } = useProfileContext();
  const aesirxData = model.getData();
  const aesirxEmai = aesirxData[MEMBER_GET_FIELD_KEY.EMAIL];
  const userID = Storage.getItem(AUTHORIZATION_KEY.MEMBER_ID);
  const accessToken = Storage.getItem(AUTHORIZATION_KEY.ACCESS_TOKEN);
  

  const formik = useFormik({
    initialValues: {
      email: aesirxEmai,
    },
    onSubmit: async (values: any) => {
      setUpdating(true);
      try {
        const response: any = await member.updateEmailMember(
          { id: userID, ...values },
          accessToken
        );
        if (response?.result?.success) {
          notify('Update email sucessfully!', 'success');
        } else {
          notify('Something when wrong!', 'error');
        }
      } catch (error: any) {
        notify(error?.message, 'error');
      }
      setUpdating(false);
    },
    validateOnMount: true,
  });
  console.log(formik.values, 'sss11');

  return (
    <div className="py-5 px-4 border rounded">
      <div className="d-flex justify-content-start align-items-center mb-2">
        <Image
          quality={100}
          className="me-2"
          src={mail_logo}
          width={40}
          height={40}
          alt="logo ethereum"
        />
        <h3 className="fw-semibold fs-18 mb-2 ms-2"> Email</h3>
      </div>

      <Form onSubmit={formik.handleSubmit} className="text-start">
        <Form.Group>
          <Form.Label className="fw-medium mb-2">
            Email address<span className="text-danger">*</span>
          </Form.Label>
          <div className="position-relative fs-7 mb-2">
            <Form.Control
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values['email']}
              className={`py-2 fs-7 ${
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
          disabled={!formik.isValid || formik.values['email'] == aesirxEmai || updating}
          variant="success"
          className="fw-semibold py-12px py-12px w-100"
        >
          {formik.values['email'] != aesirxEmai ? 'Update Email' : 'Connected'}
        </Button>
      </Form>
    </div>
  );
};

export default Email;
