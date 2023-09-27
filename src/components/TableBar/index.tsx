/**
 * Renders MyComponent.
 *
 * @param {Object} props - The component props.
 * @param {string} props.dataFilter - The data filter.
 * @param {function} props.setFilter - The function to set the filter.
 * @param {Array} props.tableRowHeader - The table row headers.
 * @param {function} props.setGlobalFilters - The function to set the global filters.
 * @param {function} props.onAction - The function to handle the action.
 * @param {boolean} props.isList - Indicates whether the component should be displayed as a list.
 * @returns {JSX.Element} The rendered component.
 */

import { faChevronDown, faColumns, faList, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobalFilter } from 'components/GlobalFilter';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface TableBarType {
  dataFilter: { searchText: string };
  setFilter: () => void;
  tableRowHeader: { Header: string }[];
  setGlobalFilters: () => void;
  onAction: () => void;
  isList: boolean;
}

const TableBar: React.FC<TableBarType> = ({
  dataFilter,
  setFilter,
  tableRowHeader,
  setGlobalFilters,
  onAction,
  isList,
}) => {
  const { t } = useTranslation();

  return (
    <div className="px-3 d-flex justify-content-between w-100">
      <div className="d-flex">
        <GlobalFilter
          setGlobalFilter={setGlobalFilters}
          searchText="Search..."
          filter={dataFilter}
          setFilter={setFilter}
        />
        <div className="me-3">
          <Dropdown>
            <Dropdown.Toggle variant="white" className="bg-white">
              <i>
                <FontAwesomeIcon icon={faColumns} />
              </i>
              <span className="ps-2 pe-3">{t('txt_columns')}</span>
              <i className="text-green">
                <FontAwesomeIcon icon={faChevronDown} />
              </i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-max">
              {tableRowHeader.map((rowHeader: { Header: string }, index: number) => (
                <div key={index} className="p-2 d-flex">
                  <input type="checkbox" id={`item${index}`} className="form-check-input d-block" />
                  <label className="ps-2" htmlFor={`item${index}`}>
                    {rowHeader.Header}
                  </label>
                </div>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="white" className="bg-white">
              <span className="ps-2 pe-3">{t('choose_an_action')}</span>
              <i className="text-green">
                <FontAwesomeIcon icon={faChevronDown} />
              </i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-max">
              <div className="p-2 d-flex">
                <input type="checkbox" id="delete_row" className="form-check-input d-block" />
                <label className="ps-2" htmlFor="delete_row">
                  Delete item
                </label>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="d-flex items-center">
        <button
          type="button"
          className={`btn  rounded-0 px-4 shadow-none ${isList ? 'bg-blue-3 text-white' : ''}`}
          onClick={() => onAction()}
        >
          <i>
            <FontAwesomeIcon icon={faList} />
          </i>
          <span className="ms-2 opacity-75">{t('txt_list')}</span>
        </button>
        <button
          type="button"
          className={`btn  rounded-0 px-4 shadow-none ${isList ? '' : 'bg-blue-3 text-white'}`}
          onClick={() => onAction()}
        >
          <i>
            <FontAwesomeIcon icon={faTh} />
          </i>
          <span className="ms-2 opacity-75">{t('txt_thumb')}</span>
        </button>
      </div>
    </div>
  );
};

export { TableBar };
