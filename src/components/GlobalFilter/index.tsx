/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

/**
 * GlobalFilter component
 *
 * @param {GlobalFilterProps} props - The component props
 * @param {Function} props.setGlobalFilter - Function to set the global filter
 * @param {string} props.searchText - The search text
 * @param {any} props.filter - The filter object
 * @param {Function} props.setFilter - Function to set the filter
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { useAsyncDebounce } from 'react-table';

interface GlobalFilterProps {
  setGlobalFilter: any;
  searchText: string;
  filter: {
    searchText: string;
  };
  setFilter?: any;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({
  setGlobalFilter,
  searchText,
  filter,
  setFilter,
}) => {
  const [, setValue] = React.useState('');
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter({ keyword: value });
  }, 200);

  return (
    <span className=" d-flex align-items-center position-relative pe-3 w-400">
      <input
        onChange={(e) => {
          if (setFilter) {
            setFilter(e.target.value);
          }
          setValue(e.target.value);
          onChange(e.target.value);
          filter.searchText = e.target.value;
        }}
        value={filter.searchText}
        placeholder={searchText}
        className="form-control border-end-0 pe-2 border-0 pe-4"
      />
      <i className="text-green position-absolute top-0 bottom-0 end-0 pe-4 d-flex align-items-center">
        <FontAwesomeIcon icon={faSearch} />
      </i>
    </span>
  );
};

export { GlobalFilter };
