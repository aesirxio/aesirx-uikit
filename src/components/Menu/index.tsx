/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import './index.scss';
import arrow from '../../assets/images/arrow-right.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from 'providers';

const Menu = ({ dataMenu, title = '' }: any) => {
  const { settingRoutes } = useAppContext();
  const match = useRouteMatch();
  const has = settingRoutes?.find((router: any) => router.path === match.path);

  const [isOpenCollapse, setIsOpenCollapse] = useState<any>('default');

  const { t } = useTranslation();

  useEffect(() => {
    checkActiveMenu();
  }, []);

  const handleOpen = (clickedIndex: any, parentIndex?: any) => {
    if (isOpenCollapse === clickedIndex.toString()) {
      if (parentIndex) {
        setIsOpenCollapse(parentIndex.toString());
      } else {
        setIsOpenCollapse(null);
      }
    } else {
      if (isOpenCollapse?.includes(clickedIndex.toString())) {
        setIsOpenCollapse(null);
      } else {
        setIsOpenCollapse(clickedIndex.toString());
      }
    }
  };
  const checkActiveMenu = () => {
    if (window.location.pathname === '/') {
      document.getElementById('wr_list_menu')?.classList.remove('wr_list_menu');
    } else {
      document.getElementById('wr_list_menu')?.classList.add('wr_list_menu');
    }
  };

  return (
    <>
      {dataMenu && (
        <nav className="main-menu py-24 mt-0">
          <p className="menu_title text-dark-blue fs-14 mb-0 text-uppercase">
            {t(title ? title : has ? 'txt_menu_setting' : 'txt_main_menu')}
          </p>
          <ul id="wr_list_menu" className="list-unstyled mb-0 pt-md-1">
            {dataMenu?.map((menuList: any, menuListkey: any) => {
              return (
                <li
                  key={menuListkey}
                  className={`item_menu ${menuList.className ? menuList.className : ''}`}
                >
                  {!menuList.submenu ? (
                    <>
                      {menuList.link && (
                        <NavLink
                          exact={true}
                          to={menuList.link}
                          className={`d-block px-24 py-16 mx-3 rounded link_menu text-white text-decoration-none`}
                          activeClassName={`active`}
                          onClick={() => setIsOpenCollapse(null)}
                        >
                          {menuList.icons_fa ? (
                            <i>
                              <FontAwesomeIcon icon={menuList.icons_fa} />
                            </i>
                          ) : (
                            <span
                              className="icon d-inline-block align-text-bottom"
                              style={{
                                WebkitMaskImage: `url(${menuList.icons_color})`,
                                WebkitMaskRepeat: 'no-repeat',
                                backgroundColor: '#fff',
                              }}
                            ></span>
                          )}

                          <span className="ms-16 text d-inline-block text-body">
                            {t(menuList.text)}
                          </span>
                        </NavLink>
                      )}
                    </>
                  ) : (
                    <>
                      <NavLink
                        to={menuList.submenu[0]?.link}
                        onClick={() => handleOpen(menuListkey)}
                        className={`d-flex align-items-center justify-content-center rounded-0 link_menu text-decoration-none text-break w-100 px-24 py-16 shadow-none text-white ${
                          isOpenCollapse === menuListkey.toString() ||
                          isOpenCollapse?.includes(menuListkey + '-')
                            ? 'active'
                            : ''
                        }`}
                        aria-controls="wr_list_submenu"
                        aria-expanded={
                          isOpenCollapse === menuListkey.toString() ||
                          isOpenCollapse?.includes(menuListkey + '-')
                        }
                      >
                        <span
                          className="icon d-inline-block align-text-bottom"
                          style={{
                            WebkitMaskImage: `url(${menuList.icons_color})`,
                            WebkitMaskRepeat: 'no-repeat',
                            backgroundColor: '#fff',
                          }}
                        ></span>
                        <span className="ms-16 text d-inline-block text-body">
                          {t(menuList.text)}
                        </span>
                        <span
                          className="icon arrow d-inline-block align-text-bottom ms-auto"
                          style={{
                            WebkitMaskImage: `url('${arrow}')`,
                            WebkitMaskRepeat: 'no-repeat',
                            backgroundColor: '#fff',
                          }}
                        ></span>
                      </NavLink>
                      <Collapse
                        in={
                          isOpenCollapse === menuListkey.toString() ||
                          isOpenCollapse?.includes(menuListkey + '-')
                        }
                      >
                        <ul id="wr_list_submenu" className="list-unstyled">
                          {menuList.submenu.map((value: any, menuListSubkey: any) => {
                            return (
                              <li
                                key={menuListSubkey}
                                className={`item_menu`}
                                onClick={checkActiveMenu}
                              >
                                {value.link && (
                                  <NavLink
                                    exact={true}
                                    to={value.link}
                                    className={`d-block px-24 py-16 mx-3 rounded link_menu text-white text-decoration-none`}
                                    activeClassName={`active`}
                                  >
                                    {value?.mini_text ? (
                                      <span className="mini-text-wrapper">
                                        <span className="mini-text">{t(value?.mini_text)}</span>
                                        <span className="text">{t(value.text)}</span>
                                      </span>
                                    ) : (
                                      <span className="text d-inline-block">{t(value.text)}</span>
                                    )}
                                  </NavLink>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </Collapse>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
};

export { Menu };
