/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from '../Image';
import styles from './index.module.scss';

class Button extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { icon, text, onClick, image, disabled }: any = this.props;
    let { className }: any = this.props;

    if (className !== undefined && styles[className] !== undefined) {
      className = styles[className];
    }

    return (
      <button
        type="button"
        className={`d-flex justify-content-center btn ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {icon && (
          <i className="pe-1">
            <FontAwesomeIcon icon={icon} />
          </i>
        )}
        {image && <Image alt={text} src={image} className="pe-1" />}

        <span className="text_btn text-nowrap">{text}</span>
      </button>
    );
  }
}

export { Button };
