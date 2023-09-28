import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Image } from 'components';
// import { updateMember } from '@/utils/aesirx';
import { AesirxMemberApiService } from 'aesirx-lib';
import { useUserContext } from '../../../providers/user';
import { useGlobalContext } from '../../../providers/global';
import { ReactNode } from 'react';
import icon from '../../../assets/images/register_success_icon.png';
import { notify } from 'components';
interface AlertObject {
  show: boolean;
  content: ReactNode | string;
  type: 'success' | 'error';
}

const Password = ({ show, setShow }: any) => {
  const { aesirxData, getData } = useUserContext();
  const { accessToken, jwt } = useGlobalContext();
  const member = new AesirxMemberApiService();
  const [sending, setSending] = useState(false);
  const [alert, setAlert] = useState<AlertObject>({ show: false, content: '', type: 'success' });
  const transformMessage = (content_id: string) => {
    let message = 'Update password unsucessfully!';
    switch (content_id) {
      case 'wrong_current_password':
        message = 'Current password is wrong!';
        break;
    }
    return message;
  };

  const formik = useFormik({
    initialValues: {
      curr_password: '',
      new_password: '',
    },
    validationSchema: Yup.object({
      curr_password: Yup.string().required('Please enter current password'),
      new_password: Yup.string()
        .required('Please enter new password')
        .notOneOf([Yup.ref('curr_password')], 'New password must be different from old password'),
    }),
    onSubmit: async (values: any) => {
      let alertObject: AlertObject = {
        show: true,
        content: 'Something when wrong!',
        type: 'error',
      };
      setSending(true);
      try {
        const response = await member.updateMember(
          { id: aesirxData?.member_id, ...values },
          accessToken
        );
        if (response?.result?.success) {
          alertObject.type = 'success';
          alertObject.content = `Update password successfully!`;
          formik.resetForm();
        } else {
          const message = transformMessage(response?.result?.content_id);
          alertObject = {
            ...alertObject,
            type: 'error',
            content: message,
          };
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('Error', error);
        notify('Something when wrong!', 'error');
      }
      setSending(false);
      setAlert(alertObject);
    },
    validateOnMount: true,
  });

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="border-0 pb-0" closeButton></Modal.Header>
      <Modal.Body>
        <div className="py-2rem px-4 rounded text-center">
          <Image src={icon} width={96} height={99} quality={100} alt="Icon Image " />
          <h3 className="fw-medium text-primary fs-2 mb-4">Change password</h3>
          <Form onSubmit={formik.handleSubmit} className="text-start">
            <Form.Group>
              <Form.Label className="text-primary mb-2">
                Current password<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                name="curr_password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values['curr_password']}
                className={`py-13px lh-sm ${
                  formik.touched['curr_password'] && formik.errors['curr_password']
                    ? 'border-danger'
                    : ''
                }`}
              />
              {formik.touched['curr_password'] && formik.errors['curr_password'] ? (
                <p className="mt-2 fs-7 mb-12px p-0 bg-white border-0 text-danger d-flex align-items-center">
                  <FontAwesomeIcon icon={faCircleExclamation} width={14} height={14} />
                  <span className="fs-7 fw-semibold ms-2 lh-1">
                    {formik.errors['curr_password'].toString()}
                  </span>
                </p>
              ) : null}
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label className="text-primary mb-2">
                New password<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                name="new_password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values['new_password']}
                className={`py-13px lh-sm ${
                  formik.touched['new_password'] && formik.errors['new_password']
                    ? 'border-danger'
                    : ''
                }`}
              />
              {formik.touched['new_password'] && formik.errors['new_password'] ? (
                <p className="mt-2 fs-7 mb-12px p-0 bg-white border-0 text-danger d-flex align-items-center">
                  <FontAwesomeIcon icon={faCircleExclamation} width={14} height={14} />
                  <span className="fs-7 fw-semibold ms-2 lh-1">
                    {formik.errors['new_password'].toString()}
                  </span>
                </p>
              ) : null}
            </Form.Group>
            <p className="mb-0 text-end mt-1">
              <a
                className="fs-7 fw-medium text-decoration-none"
                href="/auth/forgot-password"
                target="_blank"
              >
                Forgot password?
              </a>
            </p>
            <Button
              disabled={sending || !formik.isValid}
              type="submit"
              variant="success"
              className="fw-semibold py-12px mt-12px py-12px w-100"
            >
              Change Password
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Password;
