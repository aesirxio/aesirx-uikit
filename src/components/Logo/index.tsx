/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Image } from '../Image';
import logoWhite from '../../assets/images/logo/logo-white.svg';
import logoWhiteMini from '../../assets/images/logo/logo-white-mini.svg';

const Logo = ({ isMini }: any) => {
  return (
    <div className="wrapper_header_logo bg-menu d-xl-flex d-none  w-248 h-80 align-items-center">
      <a
        href={window.location.href}
        className={`header_logo d-block  ${isMini ? 'mx-auto my-auto' : 'mx-3 mt-4'}`}
      >
        <Image
          className={`logo_white ${isMini ? 'pe-0' : 'pe-3 pe-lg-6'}`}
          src={`${isMini ? logoWhiteMini : logoWhite}`}
          alt="AesirX"
        />
        <p className="fs-sm py-2 text-white">Digital Marketing Automation</p>
      </a>
    </div>
  );
};

export { Logo };
