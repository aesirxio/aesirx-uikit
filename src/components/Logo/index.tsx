/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from "react";
import Image from "../Image";
import logo from "../../assets/images/logo/logo-white.svg";

const Logo = () => {
  return (
    <div className="wrapper_header_logo bg-dark flex-248 h-80 d-flex align-items-center">
      <a href="/" className={`header_logo d-block px-3`}>
        <Image className="logo_white pe-6" src={logo} alt="AesirX" />
      </a>
    </div>
  );
};

export default Logo;
