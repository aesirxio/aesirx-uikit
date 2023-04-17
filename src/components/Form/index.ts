/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const RenderingGroupFieldHandler = (group: any, validator: any) =>
  Object.keys(group.fields)
    .map((fieldIndex) =>
      [...Array(group.fields[fieldIndex])].map((field) => {
        return (() => {
          let className = field.className ? field.className : '';
          switch (field.type) {
            default:
              return '11';
          }
        })();
      })
    )
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

export { RenderingGroupFieldHandler };
