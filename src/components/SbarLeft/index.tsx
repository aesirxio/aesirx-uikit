/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { useAppContext } from 'providers';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { useTranslation } from 'react-i18next';

const SbarLeft = () => {
  const { componentBottomMenu, leftMenu, settingMenu, settingRoutes } = useAppContext();
  const match = useRouteMatch();
  const has = settingRoutes?.find((router: any) => router.path === match.path);
  const { t } = useTranslation();

  let version = '';
  try {
    version = VERSION;
  } catch (error) {
    /* empty */
  }

  return (
    <aside
      className={`sidebar w-248 mt-0 position-relative bg-dark mh-100 h-100 d-flex flex-column z-index-100 justify-content-between`}
    >
      {has ? (
        <nav>
          <div className="py-1 px-3 item_menu item_menu_home">
            <Link
              to="/"
              className="d-block text-white p-3 link_menu rounded-2 text-decoration-none  "
            >
              <i>
                <FontAwesomeIcon icon={faArrowLeft} />
              </i>
              <span className="ms-3 text text-white">{t('txt_back_to_dashboard')}</span>
            </Link>
          </div>
          {settingMenu}
        </nav>
      ) : (
        leftMenu
      )}

      <div>
        {componentBottomMenu}
        {version && (
          <span className="ms-3 mb-3 text text-white fs-14">
            {t('txt_version')} {version}
          </span>
        )}
      </div>
    </aside>
  );
};

export { SbarLeft };
