/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from "react";
import Header from "../../components/Header";

const MainLayout = ({ children, leftComponent }: any) => {
  return (
    <div className="container-fluid main-layout ">
      <div className="row">
        <main className="p-0">
          <Header />
          <div className="main_content vh-100 main_content_dashboard pd-t-80 d-flex">
            <aside
              className={`sidebar w-248  mt-0 position-relative bg-dark mh-100 overflow-hidden d-flex flex-column z-index-100 `}
            >
              {leftComponent}
            </aside>
            <div className="flex-1 mh-100 overflow-hidden overflow-y-auto position-relative main-content bg-theme">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export { MainLayout };
