/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const Hambuger = ({ handleAction, className }: any) => {
  return (
    <div
      className={`wrapper_hambuger d-none cursor-pointer ps-3 pe-2 ${className}`}
      onClick={handleAction}
    >
      <div className="item_hambuger"></div>
      <div className="item_hambuger"></div>
      <div className="item_hambuger"></div>
    </div>
  );
};

export { Hambuger };
