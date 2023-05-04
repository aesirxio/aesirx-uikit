/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { ToastContainer, toast } from 'react-toastify';

import './index.scss';
import { Translation } from 'react-i18next';

import error from 'assets/images/error.png';
import warn from 'assets/images/warn.png';
import success from 'assets/images/success.png';

const Toast = () => {
  return <ToastContainer hideProgressBar={true} />;
};

const notify = async (msg: any, type = 'success') => {
  switch (type) {
    case 'error':
      toast.error(
        <>
          <Translation>{(t) => <span>{t('txt_error')}</span>}</Translation>
          {msg && <p className="fw-normal m-0">{msg}</p>}
        </>,
        {
          className: 'bg-red-10 fw-bold text-red-100 ps-4 bg-noti-bg-error text-noti-error',
          icon: () => <img alt="error" src={error} />,
        }
      );
      break;
    case 'warn':
      toast.warn(
        <>
          <Translation>{(t) => <span>{t('txt_warning')}</span>}</Translation>
          {msg && <p className="fw-normal m-0">{msg}</p>}
        </>,
        {
          className: 'bg-yellow-10 fw-bold text-yellow-200 ps-4 bg-noti-bg-warn text-noti-warn',
          icon: () => <img alt="warn" src={warn} />,
        }
      );
      break;
    case 'success':
      toast.success(
        <>
          <Translation>{(t) => <span>{t('txt_successful')}</span>}</Translation>
          {msg && <p className="fw-normal m-0">{msg}</p>}
        </>,
        {
          className: 'bg-primary-10 bg-noti-bg-success text-green fw-bold ps-4',
          icon: () => <img alt="success" src={success} />,
        }
      );
      break;
    case 'promise':
      return await toast.promise(
        msg,
        {
          pending: {
            render() {
              return <span className="p-15 pe-2">Progressing...</span>;
            },
            icon: () => <img alt="success" src={success} />,
          },
          success: {
            render() {
              return (
                <>
                  <Translation>{(t) => <span>{t('txt_successful')}</span>}</Translation>
                  {msg && <p className="fw-normal m-0">{msg}</p>}
                </>
              );
            },
            className: 'bg-primary-10 text-green bg-noti-bg-success  fw-bold ps-4',
            icon: () => <img alt="success" src={success} />,
          },
          error: {
            render() {
              return (
                <>
                  <Translation>{(t) => <span>{t('txt_error')}</span>}</Translation>
                  {msg && <p className="fw-normal m-0">{msg}</p>}
                </>
              );
            },
            className: 'bg-red-10 fw-bold bg-noti-bg-error text-noti-error text-red-100 ps-4',
            icon: () => <img alt="error" src={error} />,
          },
        },
        {
          className: 'bg-dark',
        }
      );

    default:
      toast.info(msg, {
        className: 'bg-info',
      });
      break;
  }
};

const notifyHTML = (text: any) => {
  return toast.success(<div className="text-white" dangerouslySetInnerHTML={{ __html: text }} />);
};

export { Toast, notify, notifyHTML };
