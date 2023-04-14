/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from "react";

import "./index.scss";

import Hambuger from "../Hambuger";
import Logo from "components/Logo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";

const Header: React.FC = () => {
  const [isMini, setMini] = useState(false);
  const handleCollap = () => {
    document.body.classList.toggle("mini_left");
    setMini(!isMini);
  };

  const handleMenuLeft = () => {
    document.querySelector(".main-layout")?.classList.toggle("show_menu_left");
  };

  return (
    <div
      id="all_header"
      className="wrapper_header d-flex position-fixed w-100 top-0 left-0 right-0 pr-3 align-items-center shadow-sm z-index-100 bg-header"
    >
      <Hambuger handleAction={handleMenuLeft} />
      <Logo isMini={isMini} />
      <div className="content_header h-80 border-start-1 flex-1 d-flex align-items-center ps-4 pr-4 position-relative">
        <span
          className="
            item_collap
            d-flex
            position-absolute
            text-green
            bg-blue-1
            rounded-circle
            align-items-center
            justify-content-center
            fs-12
            cursor-pointer
          "
          onClick={handleCollap}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-green" />
        </span>
        <div className="d-flex flex-1 align-items-center">
          {/* <Search /> */}
          {/* <div className="ms-auto d-flex align-items-center button-language ">
            <FontAwesomeIcon icon={faGlobe} className="text-body" />
            <Select
              isClearable={false}
              isSearchable={false}
              isBorder={false}
              isShadow={false}
              options={listLanguages}
              className="shadow-none text-gray-5"
              onChange={(data) => {
                i18n.changeLanguage(data.value);
              }}
              defaultValue={currentLanguage}
            />
          </div>
          <div className="switch-theme-button col-auto py-2 px-3">
            <SwitchThemes />
          </div>
          <div className="d-flex align-items-center">
            <div className="wr_help_center ps-3 pe-3 d-none">
              <span className="item_help d-flex align-items-center text-blue-0 cursor-pointer">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <span className="text white-spacing-nowrap ps-2">
                  {t("txt_help_center")}
                </span>
              </span>
            </div>

            <div className="ps-3 pe-3">
              <DropdownAvatar />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
