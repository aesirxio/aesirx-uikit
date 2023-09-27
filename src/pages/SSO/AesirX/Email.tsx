import React from 'react';
import { useUserContext } from '../../../providers/user';
import { Button, Form } from 'react-bootstrap';
import ButtonCopy from '../../../components/ButtonCopy';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import {AesirxMemberApiService} from 'aesirx-lib';
import { useGlobalContext } from '../../../providers/global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import { validateEmail } from '../../../store/UtilsStore/web3';
import { useCallback } from 'react';
import { Image } from 'components';
import mail_logo from '../../../assets/images/mail_logo.png';
import { notify } from 'components';
const Email = () => {
  const [updating, setUpdating] = useState(false);
  const { aesirxData, getData } = useUserContext();
  const { accessToken, jwt } = useGlobalContext();
  console.log(aesirxData,"sss");
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCheckEmail: any = useCallback(debounce(validateEmail, 200), []);

  const formik = useFormik({
    initialValues: {
      email: aesirxData?.email,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email')
        .test('unique', 'This Email is already taken', async (value) => {
          if (value != aesirxData?.email) {
            return await debouncedCheckEmail(value);
          } else {
            return true;
          }
        }),
    }),
    onSubmit: async (values: any) => {
      let updateSuccess = true;
      setUpdating(true);
      try {
        const aesirxMember = new  AesirxMemberApiService();
        const response: any = await aesirxMember.updateMember(
          { id: aesirxData?.member_id, ...values },
          accessToken
        );
        if (response?.result?.success) {
          notify('Update email successfully!', 'success');
        } else {
          updateSuccess = false;
          notify(response?._messages?.[0]?.message || 'Something when wrong!', 'error');
        }
      } catch (error: any) {
        console.log('Error', error);
        updateSuccess = false;
        notify(error?.response?.data?._messages?.[0]?.message || error?.message, 'error');
      }
      setUpdating(false);
      if (updateSuccess) {
        await getData(jwt, accessToken);
      }
    },
    validateOnMount: true,
  });

  return (
    <div className="py-2rem px-4 border rounded">
      <h3 className="fw-semibold fs-18 mb-12px">
        <Image
          quality={100}
          className="me-14px"
          src={mail_logo}
          width={40}
          height={40}
          alt="logo ethereum"
        />
        Email
      </h3>
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
          disabled={!formik.isValid || formik.values['email'] == aesirxData?.email || updating}
          variant="success"
          className="fw-semibold py-12px py-12px w-100"
        >
          {formik.values['email'] != aesirxData?.email ? 'Update Email' : 'Connected'}
        </Button>
      </Form>
    </div>
  );
};

export default Email;
