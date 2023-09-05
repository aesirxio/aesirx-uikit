import { Hambuger } from 'components/Hambuger';
import { Logo } from 'components/Logo';
import React from 'react';

import './index.scss';

import { LanguagesSwitcher } from 'components/LanguagesSwitcher';
import { ThemesSwitcher } from 'components/ThemesSwitcher';
import { Profile } from 'components/Profile';
import { useAppContext } from 'providers/AppProvider';

const Header = ({ children, logo }: any) => {
  const { noavatar, integration, rootId } = useAppContext();

  const handleMenuLeft = () => {
    document.querySelector(rootId).classList.toggle('show_menu_left');
  };

  return (
    <div
      id="all_header"
      className={`wrapper_header d-flex position-fixed w-100 left-0 right-0 pr-3 align-items-center shadow-sm z-index-100  ${
        integration ? 'top-30px' : 'top-0'
      }`}
    >
      <Hambuger handleAction={handleMenuLeft} />
      <Logo logo={logo} />
      <div className="content_header h-80 b flex-1 d-flex align-items-center ps-2 ps-lg-4 position-relative w-50 w-lg-100 bg-blue-5">
        <div className="d-flex justify-content-end flex-1 align-items-center">
          {children}
          <LanguagesSwitcher />
          <ThemesSwitcher />

          {!noavatar && <Profile />}
        </div>
      </div>
    </div>
  );
};

export { Header };
