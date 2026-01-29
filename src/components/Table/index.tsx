/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect } from 'react';
import {
  useExpanded,
  usePagination,
  useRowSelect,
  useRowState,
  useSortBy,
  useTable,
} from 'react-table';
import { withTranslation } from 'react-i18next';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { NoData } from 'components/NoData';
import SubRowAsync from './RowSubComponent';
import { env } from 'process';

function useInstance(instance: any) {
  const { allColumns } = instance;

  let rowSpanHeaders: any = [];

  allColumns.forEach((column: any) => {
    const { id, enableRowSpan } = column;

    if (enableRowSpan !== undefined) {
      rowSpanHeaders = [...rowSpanHeaders, { id, topCellValue: null, topCellIndex: 0 }];
    }
  });

  Object.assign(instance, { rowSpanHeaders });
}

const Table = ({
  columns,
  data,
  // store,
  isDesc,
  onSort,
  dataList,
  selection = false,
  classNameTable,
  onRightClickItem,
  sortAPI,
  canSort,
  pagination,
  selectPage,
  currentSelect,
  textNodata,
  onSelectionItem,
  hasSubRow,
  idKey,
  listViewModel,
  ...props
}: any) => {
  const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }: any, ref: any) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input className="form-check-input d-block" type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  });

  const renderRowSubComponent = React.useCallback(
    ({ row, rowProps, visibleColumns }: any) => (
      <SubRowAsync
        row={row}
        rowProps={rowProps}
        visibleColumns={visibleColumns}
        listViewModel={listViewModel ? listViewModel : null}
        idKey={idKey}
      />
    ),
    [listViewModel, idKey]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    rowSpanHeaders,
    selectedFlatRows,
    visibleColumns,
    state: { selectedRowIds },
  }: any = useTable(
    {
      columns,
      data,
    },
    (hooks) => {
      hooks.useInstance.push(useInstance);
      !selection &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            className: 'border-bottom-1 text-uppercase py-2 ps-16 align-middle',
            width: 10,
            Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }: any) => (
              <div className="wrapper_checkbox">
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useRowState
  );

  useEffect(() => {
    const selectedIds = Object.keys(selectedRowIds);
    if (selectedIds.length > 0) {
      const selectedRowsData = selectedIds
        .map((x) => data[x])
        .filter(function (x) {
          return x != null;
        });
      onSelectionItem && onSelectionItem(selectedRowsData);
    } else {
      onSelectionItem && onSelectionItem([]);
    }
  }, [selectedRowIds, onSelectionItem, data]);

  currentSelect && currentSelect(selectedFlatRows);
  const { t } = props;
  return (
    <>
      <div className="fs-14 position-relative pt-3 px-3 rounded-3 is-list">
        {rows.length ? (
          <table {...getTableProps()} className={`${classNameTable} w-100`}>
            <thead className="fs-6 bg-blue-5 border-bottom-2">
              {headerGroups.map((headerGroup: any, index: any) => {
                let newHeaderGroup = [];

                dataList
                  ? (newHeaderGroup = headerGroup.headers.filter(
                      (item: any) => !dataList.some((other: any) => item.id === other)
                    ))
                  : (newHeaderGroup = headerGroup.headers);

                return (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {newHeaderGroup.map((column: any, index: any) => {
                      canSort = canSort ?? column.canSort;
                      sortAPI = sortAPI ?? column.sortType;
                      const sortParams = canSort ? column.id : '';
                      let columnInside: any;
                      if (column.rowSpanHeader && canSort && !sortAPI) {
                        columnInside = column.columns[0];
                      }
                      return (
                        <th
                          key={index}
                          {...(!sortAPI && {
                            ...column.getHeaderProps(
                              canSort && !column.rowSpanHeader
                                ? column.getSortByToggleProps()
                                : columnInside && columnInside.getSortByToggleProps()
                            ),
                          })}
                          className={`${column.className} ${
                            sortAPI && sortParams !== 'number' && sortParams !== 'selection'
                              ? 'cursor-pointer'
                              : ''
                          } fw-normal px-3 py-3 flex-1 column-header-${column.id}
                            `}
                          rowSpan={`${column.rowSpanHeader ?? 1}`}
                        >
                          {column.render('Header')}
                          {canSort && (
                            <span className={`position-relative`}>
                              {sortAPI ? (
                                sortParams !== 'number' && sortParams !== 'selection' ? (
                                  isDesc ? (
                                    <FontAwesomeIcon
                                      className="sort-icon sort-icon-down ms-sm"
                                      icon={faSortDown}
                                      onClick={() =>
                                        onSort({ ordering: column.id, direction: 'desc' })
                                      }
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      className="sort-icon sort-icon-up ms-sm mb-nsm"
                                      icon={faSortUp}
                                      onClick={() =>
                                        onSort({ ordering: column.id, direction: 'asc' })
                                      }
                                    />
                                  )
                                ) : (
                                  ''
                                )
                              ) : !column.rowSpanHeader ? (
                                column.isSorted &&
                                sortParams !== 'number' &&
                                sortParams !== 'selection' ? (
                                  column?.isSortedDesc || isDesc ? (
                                    <FontAwesomeIcon
                                      className="sort-icon sort-icon-down ms-sm"
                                      icon={faSortDown}
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      className="sort-icon sort-icon-up ms-sm mb-nsm"
                                      icon={faSortUp}
                                    />
                                  )
                                ) : (
                                  ''
                                )
                              ) : columnInside.isSorted &&
                                // Column have rowSpan
                                sortParams !== 'number' &&
                                sortParams !== 'selection' ? (
                                columnInside.isSortedDesc ? (
                                  <FontAwesomeIcon
                                    className="sort-icon sort-icon-down ms-sm"
                                    icon={faSortDown}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    className="sort-icon sort-icon-up ms-sm mb-nsm"
                                    icon={faSortUp}
                                  />
                                )
                              ) : (
                                ''
                              )}
                            </span>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: any, i: any) => {
                prepareRow(row);
                for (let j = 0; j < row.allCells.length; j++) {
                  const cell = row.allCells[j];
                  const rowSpanHeader = rowSpanHeaders.find((x: any) => x.id === cell.column.id);

                  if (rowSpanHeader !== undefined) {
                    if (
                      rowSpanHeader.topCellValue === null ||
                      rowSpanHeader.topCellValue !== cell.value
                    ) {
                      cell.isRowSpanned = false;
                      rowSpanHeader.topCellValue = cell.value;
                      rowSpanHeader.topCellIndex = i;
                      cell.rowSpan = 1;
                    } else {
                      rows[rowSpanHeader.topCellIndex].allCells[j].rowSpan++;
                      cell.isRowSpanned = true;
                    }
                  }
                }
                return null;
              })}
              {rows.length > 0 &&
                rows.map((row: any, rowIndex: number) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  const isGrayRow = rowIndex % 2 === 0;
                  return (
                    <React.Fragment key={row.getRowProps().key}>
                      <tr
                        key={row.getRowProps().key}
                        {...row.getRowProps()}
                        onContextMenu={(e) => {
                          onRightClickItem && onRightClickItem(e, row.original);
                        }}
                        className={`${isGrayRow ? ' ' : 'bg-blue-5'}`}
                      >
                        {row.cells.map((cell: any, index: any) => {
                          if (cell.isRowSpanned) return null;
                          else
                            return (
                              <td
                                key={index}
                                rowSpan={cell.rowSpan}
                                {...cell.getCellProps({ style: { width: cell.column.width } })}
                                className={`py-16 fs-14 align-middle border-bottom-0 fw-normal px-3 cell-${cell.column.id}`}
                              >
                                {cell.render('Cell')}
                              </td>
                            );
                        })}
                      </tr>
                      {hasSubRow === false
                        ? null
                        : row.isExpanded &&
                          renderRowSubComponent({ row, rowProps, visibleColumns })}
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        ) : null}

        {rows.length === 0 ? (
          <div style={{ height: '50vh' }}>
            <NoData
              icons={env.PUBLIC_URL + `/assets/images/ic_project.svg`}
              title={textNodata ? textNodata : t('txt_nodata')}
              width="w-50"
            />
          </div>
        ) : null}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="d-flex justify-content-between mt-3">
          <div>
            {t('txt_totals')}{' '}
            {pagination.totalPages > pagination.page
              ? pagination.pageLimit * pagination.page
              : pagination.totalItems}{' '}
            / {pagination.totalItems}
          </div>
          <div className="d-flex gap-0">
            <div
              onClick={() => pagination.page > 1 && selectPage(pagination.page - 1)}
              className="cursor-pointer border d-flex align-items-center justify-content-center border-end-0"
              style={{
                width: '38px',
                height: '38px',
                color: '#526269',
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            {[...Array(pagination.totalPages)].map((x, index) => (
              <div
                onClick={() => selectPage(index + 1)}
                key={index}
                className={`cursor-pointer border d-flex align-items-center justify-content-center border-end-0`}
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: pagination.page == index + 1 ? '#526269' : '',
                  color: pagination.page == index + 1 ? '#fff' : '#526269',
                }}
              >
                {index + 1}
              </div>
            ))}
            <div
              onClick={() =>
                pagination.page < pagination.totalPages && selectPage(pagination.page + 1)
              }
              className="cursor-pointer border d-flex align-items-center justify-content-center"
              style={{
                width: '38px',
                height: '38px',
                color: '#526269',
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const A = withTranslation()(Table);

export { A as Table };
