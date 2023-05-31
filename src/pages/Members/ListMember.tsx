import { AesirXSelect, Button } from 'components';
import Table from 'components/Table';
import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useMemberViewModel } from './MemberViewModel/MemberViewModelContextProvider';

const ListMember = observer(() => {
  const { t } = useTranslation();
  const { model } = useMemberViewModel();
  console.log('model', model);
  const columnsTable = [
    {
      Header: () => {
        return (
          <div className="ps-2">
            <input type="checkbox" />
          </div>
        );
      },
      width: 30,
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase',
      accessor: 'stickAll',
      Cell: () => {
        return (
          <div className="ps-2">
            <input className="opacity-50" type="checkbox" />
          </div>
        );
      },
    },
    {
      Header: t('txt_username'),
      accessor: 'username',
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      width: '40%',
      Cell: ({ value }: any) => {
        return <>{value}</>;
      },
    },
    {
      Header: t('txt_email'),
      accessor: 'email',
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }: any) => {
        return <>{value}</>;
      },
    },
    {
      Header: t('txt_role'),
      accessor: 'role',
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }: any) => {
        return <>{value}</>;
      },
    },
    {
      Header: t('txt_date'),
      accessor: 'date',
      className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }: any) => {
        return <>{value}</>;
      },
    },
  ];
  const dataTable = [
    {
      username: 'Karina Tr',
      email: 'karina@aesirx.io',
      role: 'Super Admin',
      date: '3 Feb, 2022',
    },
  ];
  return (
    <div className="px-3 py-4">
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fw-bold">{t('txt_left_menu_member_list')}</h2>
        <Button
          icon={faPlus}
          text={t('txt_left_menu_add_new')}
          variant={`light`}
          className={` px-16 fw-semibold d-flex align-items-center rounded-1 btn btn-success`}
        ></Button>
      </div>
      <div className="mb-3">
        <Tabs defaultActiveKey={'membersList'} id="tab-setting">
          <Tab key="membersList" eventKey="membersList" title={t('txt_all_members')} />
          <Tab key="superAdmin" eventKey="superAdmin" title={t('txt_super_admin')} />
          <Tab key="supplier" eventKey="supplier" title={t('txt_supplier')} />
          <Tab key="manager" eventKey="manager" title={t('txt_manager')} />
          <Tab key="productImporter" eventKey="productImporter" title={t('txt_product_importer')} />
          <Tab key="merchandiser" eventKey="merchandiser" title={t('txt_merchandiser')} />
        </Tabs>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-2 my-20">
        <AesirXSelect
          defaultValue={`test`}
          options={[{ label: 'Test', value: 'test' }]}
          className={`fs-sm`}
          isBorder={true}
          placeholder={t('txt_bulk_actions')}
          arrowColor={'var(--dropdown-indicator-color)'}
          size="large"
        />
        <div className="d-flex align-items-center">
          <div className="opacity-50 me-2">{t('txt_showing')}</div>
          <AesirXSelect
            defaultValue={`test`}
            options={[{ label: 'Test', value: 'test' }]}
            className={`fs-sm`}
            isBorder={true}
            placeholder={t('txt_bulk_actions')}
            arrowColor={'var(--dropdown-indicator-color)'}
            size="large"
          />
        </div>
      </div>
      <div className="bg-white rounded">
        <Table columns={columnsTable} data={dataTable}></Table>
      </div>
    </div>
  );
});

export { ListMember };
