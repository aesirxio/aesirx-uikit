/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Image } from '../Image';
import logoWhite from '../../assets/images/logo/logo-company.svg';

const Logo = ({ logo }: any) => {
  return (
    <div className="wrapper_header_logo d-xl-flex d-none  w-260 h-80 align-items-center bg-menu">
      <a href={window.location.href} className="header_logo d-block mt-4">
        <Image className="logo_white pe-3" src={logo ? logo : logoWhite} alt="AesirX" />
        {/* <p className="fs-sm py-2 text-white">Digital Marketing Automation</p> */}
      </a>
    </div>
  );
};

export { Logo };
