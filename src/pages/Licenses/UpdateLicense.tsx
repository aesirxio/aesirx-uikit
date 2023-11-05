import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { updateMember } from '../../store/UtilsStore/aesirx';
import { useGlobalContext } from '../../providers/global';
import { notify } from '../../components/Toast';
interface Props {
  data: {
    name: string;
    data: {
      domain: string;
      test_domain: string;
    };
  };
  show: boolean;
  setShow: any;
}

const UpdateLicense = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useGlobalContext();

  const formik = useFormik({
    initialValues: {
      domain: props.data.data.domain ?? '',
      test_domain: props.data.data.test_domain ?? '',
    },
    validationSchema: Yup.object({
      domain: Yup.string()
        .required('Please enter your domain')
        .matches(/^((ftp:|http:|https:):\/\/)?(www.)?(?!.*(ftp:|http:|https:|www.))/gm, 'Invalid'),
      test_domain: Yup.string()
        .required('Please enter your test domain')
        .matches(/^((ftp:|http:|https:):\/\/)?(www.)?(?!.*(ftp|http|https|www.))/gm, 'Invalid'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await updateMember(
          { ...values, license_key: props?.data?.name },
          accessToken
        );
        if (response?.result?.success) {
          props.data.data.domain = values.domain;
          props.data.data.test_domain = values.test_domain;
          notify('Update license successfully!', 'success');
          props.setShow({ show: false });
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('UpdateMember error', error);
        notify(error?.message, 'error');
      }

      setLoading(false);
    },
  });

  if (!props?.data) {
    return null;
  }

  return (
    <Modal show={props.show} onHide={() => props.setShow({ show: false })} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit License</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" id="formGroupdomain">
            <Form.Label className="mb-2">Domain</Form.Label>
            <Form.Control
              id="domain"
              name="domain"
              className={`rounded py-12px lh-sm mb-2 ${
                formik.touched.domain && formik.errors.domain ? 'border-danger' : ''
              }`}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.domain}
            />
            {formik.touched.domain && formik.errors.domain ? (
              <Alert className="mb-0 p-0 bg-white border-0 text-danger d-flex align-items-center">
                <span className="fs-14 fw-semibold ms-2 lh-1">{formik.errors.domain}</span>
              </Alert>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" id="formGrouptest_domain">
            <Form.Label className="mb-2">Test Domain</Form.Label>
            <Form.Control
              id="test_domain"
              name="test_domain"
              className={`rounded py-12px lh-sm mb-2 ${
                formik.touched.test_domain && formik.errors.test_domain ? 'border-danger' : ''
              }`}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.test_domain}
            />
            {formik.touched.test_domain && formik.errors.test_domain ? (
              <Alert className="mb-0 p-0 bg-white border-0 text-danger d-flex align-items-center">
                <span className="fs-14 fw-semibold ms-2 lh-1">{formik.errors.test_domain}</span>
              </Alert>
            ) : null}
          </Form.Group>
          <Button
            type="submit"
            disabled={!formik?.isValid || loading}
            variant="success"
            className=" lh-sm w-100 fw-semibold py-12px"
          >
            {loading ? <Spinner /> : 'Update License'}
          </Button>
          <Alert className="mt-1 p-1">
            <span className="text-warning fs-7 fst-italic">
              Tip: A URL with a non-standard port and without http/https and www:
              Ex:partners.aesirx.io
            </span>
          </Alert>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateLicense;