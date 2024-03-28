import { AesirXSelect, Spinner, notify } from 'components';
import { Table } from 'components/Table';
import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation, withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRoleViewModel } from './RoleViewModel/RoleViewModelContextProvider';
import { history } from 'routes/history';
import { ActionsBar } from 'components/ActionsBar';

const ListRole = observer((props: any) => {
  const { t } = useTranslation();
  let listSelected: [] = [];
  const viewModel = props.model.roleListViewModel;

  useEffect(() => {
    viewModel.initializeData();
  }, []);
  const columnsTable = [
    {
      Header: t('txt_role_name'),
      accessor: 'role',
      width: 150,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semibold align-middle',
      Cell: ({ value }: any) => {
        return (
          <>
            <div className="d-flex align-items-center py-8px">
              <div>
                <div className="mb-1">{value.name}</div>
                <div className="text-green">
                  <button
                    onClick={() => {
                      history.push(`/roles/edit/${value.id}`);
                    }}
                    className="p-0 border-0 bg-transparent d-inline-block text-green"
                  >
                    {t('txt_edit')}
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const currentSelectHandler = (arr: any) => {
    listSelected = arr.map((o: any) => o.cells[1]?.value?.id);
  };

  const deleteRoles = () => {
    if (listSelected.length < 1) {
      notify(t('txt_row_select_error'), 'error');
    } else {
      viewModel.isLoading();
      viewModel.deleteRoles(listSelected);
    }
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
        <h2 className="fw-bold">{t('txt_left_menu_roles')}</h2>

        <ActionsBar
          buttons={[
            {
              title: t('txt_delete'),
              icon: '/assets/images/delete.svg',
              iconColor: '#cb222c',
              textColor: '#cb222c',
              handle: async () => {
                deleteRoles();
              },
            },
            {
              title: t('txt_add_new'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                history.push('/roles/add');
              },
            },
          ]}
        />
      </div>
      <div className="mb-3">
        <Tabs defaultActiveKey={'rolesList'} id="tab-setting" onSelect={(k) => selectTabHandler(k)}>
          <Tab key="rolesList" eventKey="rolesList" title={t('txt_all_role')} />
          {/* <Tab key="superAdmin" eventKey="superAdmin" title={t('txt_super_admin')} />
          <Tab key="supplier" eventKey="supplier" title={t('txt_supplier')} />
          <Tab key="manager" eventKey="manager" title={t('txt_manager')} />
          <Tab key="productImporter" eventKey="productImporter" title={t('txt_product_importer')} />
          <Tab key="merchandiser" eventKey="merchandiser" title={t('txt_merchandiser')} /> */}
        </Tabs>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-2 my-20">
        {/* <AesirXSelect
          defaultValue={`test`}
          options={[{ label: 'Test', value: 'test' }]}
          className={`fs-sm`}
          isBorder={true}
          placeholder={t('txt_bulk_actions')}
          arrowColor={'var(--dropdown-indicator-color)'}
          size="large"
        /> */}
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
            data={viewModel?.successResponse?.listRoles}
            pagination={viewModel?.successResponse?.pagination}
            selection={false}
            selectPage={selectPageHandler}
            currentSelect={currentSelectHandler}
          ></Table>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
});

export default withTranslation()(withRoleViewModel(ListRole));
