import { faChevronDown, faColumns, faList, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobalFilter } from 'components/GlobalFilter';
import React, { useEffect, useMemo, useState } from 'react';
import { Collapse, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AesirXDatePicker } from '../DatePicker';
import styles from './index.module.scss';
import ComponentFilter from '../ComponentFilter';
import { useTable } from 'react-table';

interface DataFilterType {
  searchText?: string;
  columns?: string[];
}

// interface TableBarType {
//   dataFilter: DataFilterType;
//   setFilter: () => void;
//   setGlobalFilters(): void;
//   onAction: () => void;
//   isList: boolean;
//   onDelete: () => void;
//   isSearch?: boolean;
//   isColumnSelected?: boolean;
//   isAction?: boolean;
//   isDateRange?: boolean;
//   defaultDate: any;
//   handleOnChange: () => void;
//   onSearch: () => void;
//   setDateFilter: () => void;
//   onDateFilter: () => void;
//   actionList?: true;
//   isFilter?: boolean;
//   dataFormFilter?: any;
//   tableRowHeader: any;
//   rowData: any;
//   view: string;
// }

interface State {
  isName: string;
  isFilter: boolean;
  indexPagination: number;
  dataFilter: any;
}

const dataFilter = {
  searchText: '',
  columns: [],
  titleFilter: {},
  datetime: null,
  page: '',
};

const TableBar = ({
  rowData,
  setFilter,
  setGlobalFilters,
  onAction,
  isList,
  onDelete,
  isSearch,
  isColumnSelected,
  isAction,
  isDateRange,
  actionList,
  onDateFilter,
  isFilter,
  dataFormFilter,
  tableRowHeader,
  view,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [getState, setState] = useState<State>({
    isName: 'list',
    isFilter: false,
    indexPagination: 0,
    dataFilter: null,
  });

  const columns = useMemo(() => tableRowHeader, [tableRowHeader]);

  const data = useMemo(() => rowData, [rowData]);

  const { allColumns, state } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: dataFilter?.columns,
    },
    autoResetHiddenColumns: false,
  });

  useEffect(() => {
    if (view !== dataFilter.page) {
      state.hiddenColumns = [];
      setFilter(null, 6);
      setFilter(view, 5);
      setState({ isFilter: false });
    }
  }, [view]);

  useEffect(() => {
    if (setFilter) {
      setFilter(state.hiddenColumns, 2);
    }
    return () => {};
  }, [state.hiddenColumns]);

  const setGlobalFilter = (dataFilter: DataFilterType | undefined) => {
    if (setGlobalFilters !== undefined) {
      const finalDataFilter = {
        ...(typeof getState.dataFilter === 'object' && getState.dataFilter),
        ...dataFilter,
      };
      setState({
        ...getState,
        dataFilter: finalDataFilter,
      });

      setGlobalFilters(finalDataFilter || undefined);
    }
  };

  const setDateFilter = (startDate: string, endDate: string) => {
    const dateFilter: any = {
      start_date: startDate,
      end_date: endDate,
    };
    onDateFilter(dateFilter);
  };

  return (
    <div className="px-3 d-flex justify-content-between w-100 bg-white">
      <div className="d-flex">
        {isSearch && (
          <div className="d-flex border-end">
            <GlobalFilter
              setGlobalFilter={setGlobalFilters}
              searchText="Search..."
              filter={dataFilter}
              setFilter={setFilter}
            />
          </div>
        )}
        {isColumnSelected && (
          <div className="d-flex border-end">
            <Dropdown>
              <Dropdown.Toggle
                variant="white"
                id="actions"
                className={`align-items-center d-flex btn_toggle h-100 bg-white ${styles.btn_toggle}`}
              >
                <i>
                  <FontAwesomeIcon icon={faColumns} />
                </i>
                <span className="ps-2 pe-3">{t('txt_columns')}</span>
                <i className="text-green">
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="pt-3 px-2 border-0 shadow">
                {allColumns.map(
                  (column) =>
                    column.id !== 'selection' &&
                    column.Header !== '' && (
                      <div key={column.id} className="mb-2">
                        <label>
                          <input
                            type="checkbox"
                            {...column.getToggleHiddenProps()}
                            className="form-check-input p-0"
                          />
                          <span className="ps-2">{column.Header}</span>
                        </label>
                      </div>
                    )
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {isAction && (
          <div className="d-flex border-end">
            <Dropdown>
              <Dropdown.Toggle variant="white" className="bg-white h-100">
                <span className="ps-2 pe-3">{t('choose_an_action')}</span>
                <i className="text-green">
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-max">
                <div className="p-2 d-flex">
                  <input
                    type="checkbox"
                    id="delete_row"
                    className="form-check-input d-none"
                    onChange={(e) => e?.target?.checked && onDelete()}
                  />
                  <label className="ps-2" htmlFor="delete_row">
                    Delete item
                  </label>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {isDateRange && (
          <div className="d-flex border-end">
            <AesirXDatePicker
              placeholder={'All dates'}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              setDateFilter={setDateFilter}
              classContainer={'d-flex align-items-center pe-10'}
              icon={true}
              inputClass={'border-0'}
              onChange={() => {}}
            />
          </div>
        )}
        <div>
          {isFilter && (
            <>
              <Collapse in={true} className="h-100">
                <div>
                  <div
                    className={`bg-white rounded-2 h-100 ${
                      getState.isFilter ? 'z-2 position-relative' : ''
                    }`}
                  >
                    {dataFormFilter && (
                      <ComponentFilter
                        dataFormFilter={dataFormFilter}
                        setGlobalFilter={setGlobalFilter}
                        filter={dataFilter}
                        setFilter={setFilter}
                      />
                    )}
                  </div>
                </div>
              </Collapse>
              {getState.isFilter && (
                <div
                  className="filter-backdrop position-fixed top-0 start-0 end-0 bottom-0 z-1"
                  onClick={() => setState({ isFilter: false })}
                ></div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="d-flex items-center">
        {actionList && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export { TableBar };
