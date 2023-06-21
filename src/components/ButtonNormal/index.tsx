/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTranslation } from 'react-i18next';

class ButtonNormal extends React.Component {
  render() {
    const { t, iconStart, iconEnd, text, onClick, className, disabled }: any = this.props;

    return (
      <>
        <button
          type="button"
          className={`btn ${className ?? ''}`}
          onClick={onClick}
          disabled={disabled}
        >
          {iconStart && (
            <i className="me-2">
              <FontAwesomeIcon icon={iconStart} />
            </i>
          )}
          <span>{t(text)}</span>

          {iconEnd && (
            <i className="ms-2">
              <FontAwesomeIcon icon={iconEnd} />
            </i>
          )}
        </button>
      </>
    );
  }
}

const B = withTranslation()(ButtonNormal);

export { B as ButtonNormal };
