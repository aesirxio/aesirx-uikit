/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from '../Image';
import styles from './index.module.scss';

const Button = ({ icon, text, onClick, image, disabled, className, loading }: any) => {
  if (className !== undefined && styles[className] !== undefined) {
    className = styles[className];
  }

  return (
    <button
      type="button"
      className={`d-flex justify-content-center btn ${className ?? 'btn-success'}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon && (
        <i className="pe-1">
          <FontAwesomeIcon icon={icon} />
        </i>
      )}
      {image && <Image alt={text} src={image} className="pe-1" />}
      <span className="text_btn text-nowrap">{text}</span>
      {loading && (
        <div className="position-relative">
          <span
            className={`ms-1 spinner-border text-body`}
            style={{ width: '20px', height: '20px' }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </span>
        </div>
      )}
    </button>
  );
};

export { Button };
