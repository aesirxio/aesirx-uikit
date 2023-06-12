/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const historyPush = (link: any) => {
  return history.push((process.env.REACT_APP_INTERGRATION ? '/pim' : '') + link);
};

export { history, historyPush };
