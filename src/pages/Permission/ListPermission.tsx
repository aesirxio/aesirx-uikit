import { AesirXSelect, Spinner } from 'components';
import { Table } from 'components/Table';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation, withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withPermissionViewModel } from './PermissionViewModel/PermissionViewModelContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { PERMISSION_FIELD } from 'aesirx-lib';
interface loadingUpdate {
  [name: string]: { status: string; value: string };
}
const ListPermission = observer((props: any) => {
  const { t } = useTranslation();
  const viewModel = props.model.permissionListViewModel;
  const [loadingUpdate, setLoadingUpdate] = useState<loadingUpdate>({});
  useEffect(() => {
    viewModel.initializeData();
  }, []);
  const columnsTable = [
    {
      id: 'expander',
      width: 50,
      Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
        <span {...getToggleAllRowsExpandedProps()}>
          {isAllRowsExpanded ? (
            <i className="ms-2 fs-5 text-success">
              <FontAwesomeIcon icon={faMinusSquare} />
            </i>
          ) : (
            <i className="ms-2 fs-5 text-success">
              <FontAwesomeIcon icon={faPlusSquare} />
            </i>
          )}
        </span>
      ),
      Cell: ({ row }: any) =>
        row.canExpand ? (
          <span
            {...row.getToggleRowExpandedProps({
              style: {
                paddingLeft: `${row.depth * 2}rem`,
              },
            })}
          >
            {row.isExpanded ? (
              <i className="ms-2 fs-5 text-success">
                <FontAwesomeIcon icon={faMinusSquare} />
              </i>
            ) : (
              <i className="ms-2 fs-5 text-success">
                <FontAwesomeIcon icon={faPlusSquare} />
              </i>
            )}
          </span>
        ) : null,
    },
    {
      Header: t('txt_role_name'),
      accessor: 'permission',
      width: 200,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value, row }: any) => {
        return (
          <>
            <div className="d-flex align-items-center py-8px">
              <div>
                <div className={`mb-1 ${row.depth !== 0 ? 'ms-2' : ''}`}>{value?.name}</div>
              </div>
            </div>
          </>
        );
      },
    },
    {
      Header: t('txt_create'),
      accessor: 'create',
      width: 100,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value, row }: any) => {
        return <SelectPermission row={row} value={value} permission={'create'} />;
      },
    },
    {
      Header: t('txt_edit'),
      accessor: 'edit',
      width: 100,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value, row }: any) => {
        return <SelectPermission row={row} value={value} permission={'edit'} />;
      },
    },
    {
      Header: t('txt_delete'),
      accessor: 'delete',
      width: 100,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value, row }: any) => {
        return <SelectPermission row={row} value={value} permission={'delete'} />;
      },
    },
  ];

  const SelectPermission = ({ row, value, permission }: any) => {
    const optionsList = [
      { label: 'Allowed', value: '1' },
      { label: 'Denied', value: '0' },
    ];
    const valueSelected =
      loadingUpdate[row?.original?.group_id + '-' + row?.original?.asset_id + '-' + permission]
        ?.value;
    return (
      <div className="d-flex align-items-center py-8px">
        <div className="mb-1 position-relative">
          {row?.depth !== 0 && (value?.toString() === '0' || value?.toString() === '1') && (
            <>
              {loadingUpdate[
                row?.original?.group_id + '-' + row?.original?.asset_id + '-' + permission
              ]?.status === 'saving' && <Spinner className="spinner-overlay" size={'30px'} />}
              <AesirXSelect
                defaultValue={{
                  label: optionsList?.find(
                    (o: any) =>
                      o.value?.toString() ===
                      (valueSelected ? valueSelected?.toString() : value?.toString())
                  )?.label,
                  value: valueSelected ? valueSelected?.toString() : value?.toString(),
                }}
                options={optionsList}
                className={`fs-sm`}
                isDisabled={
                  loadingUpdate[
                    row?.original?.group_id + '-' + row?.original?.asset_id + '-' + permission
                  ]?.status === 'saving'
                    ? true
                    : false
                }
                isBorder={true}
                arrowColor={'var(--dropdown-indicator-color)'}
                size="large"
                onChange={(data: any) => {
                  handleChangeOption(
                    row?.original?.entity,
                    row?.original?.asset_id,
                    row?.original?.group_id,
                    data?.value,
                    permission
                  );
                }}
              />
            </>
          )}
        </div>
      </div>
    );
  };

  const handleChangeOption = async (
    entity: any,
    asset_id: any,
    group_id: any,
    value: any,
    action: string
  ) => {
    setLoadingUpdate({
      ...loadingUpdate,
      [group_id + '-' + asset_id + '-' + action]: { status: 'saving', value: value },
    });
    await viewModel.handleFormPropsData(PERMISSION_FIELD.ASSET_ID, asset_id ?? 0);
    await viewModel.handleFormPropsData(PERMISSION_FIELD.GROUP_ID, group_id ?? 0);
    await viewModel.handleFormPropsData(PERMISSION_FIELD.ENTITY, entity ?? '');
    await viewModel.handleFormPropsData(PERMISSION_FIELD.VALUE, value ?? '1');
    await viewModel.handleFormPropsData(PERMISSION_FIELD.ACTION, action ?? '');
    await viewModel.update();
    setLoadingUpdate({
      ...loadingUpdate,
      [group_id + '-' + asset_id + '-' + action]: { status: 'done', value: value },
    });
  };

  const selectPageHandler = (value: any) => {
    if (value != viewModel.successResponse.pagination.page) {
      viewModel.isLoading();
      viewModel.getListByFilter(
        'list[start]',
        (value - 1) * viewModel.successResponse.pagination.pageLimit
      );
    }
  };

  const selectShowItemsHandler = (value: any) => {
    viewModel.isLoading();
    viewModel.getListByFilter('list[limit]', value?.value);
  };

  const selectTabHandler = (value: any) => {
    viewModel.isLoading();
    if (value != 'default') {
      viewModel.getListByFilter('filter[published]', value);
    } else {
      viewModel.getListByFilter('filter[published]', '');
    }
  };

  return (
    <div className="px-3 py-4">
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fw-bold">{t('txt_left_menu_permissions')}</h2>
      </div>
      <div className="mb-3">
        <Tabs
          defaultActiveKey={'permissionsList'}
          id="tab-setting"
          onSelect={(k) => selectTabHandler(k)}
        >
          <Tab key="permissionsList" eventKey="permissionsList" title={t('txt_all_permission')} />
        </Tabs>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-2 my-20">
        <div></div>
        <div className="d-flex align-items-center">
          <div className="text-gray me-2">{t('txt_showing')}</div>
          <AesirXSelect
            defaultValue={{
              label: `${viewModel?.successResponse?.filters['list[limit]']} ${t('txt_items')}`,
              value: viewModel?.successResponse?.filters['list[limit]'],
            }}
            options={[...Array(9)].map((o, index) => ({
              label: `${(index + 1) * 10} ${t('txt_items')}`,
              value: (index + 1) * 10,
            }))}
            onChange={(o: any) => selectShowItemsHandler(o)}
            className={`fs-sm bg-white shadow-sm rounded-2`}
            isBorder={true}
            placeholder={`Select`}
            arrowColor={'var(--dropdown-indicator-color)'}
            size="large"
          />
        </div>
      </div>
      <div className="bg-white rounded">
        {viewModel?.successResponse?.state ? (
          <Table
            classNameTable={`bg-white rounded table-striped table`}
            columns={columnsTable}
            data={viewModel?.successResponse?.listPermission}
            pagination={viewModel?.successResponse?.pagination}
            selection={true}
            selectPage={selectPageHandler}
            hasSubRow={true}
          ></Table>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
});

export default withTranslation()(withPermissionViewModel(ListPermission));
