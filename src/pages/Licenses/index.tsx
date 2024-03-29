import ButtonCopy from '../../components/ButtonCopy';
import { useUserContext, UserContextProvider } from '../../providers/user';
import { GlobalContextProvider } from '../../providers/global';
import React, { useState } from 'react';
import { Col, Dropdown, Row, Table } from 'react-bootstrap';
import UpdateLicense from './UpdateLicense';
import UpgradeLicense from './UpgradeLicense';
import { shortenString } from '../../store/UtilsStore/aesirx';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import Web3ContextProvider from '../../providers/web3';
import { Spinner } from '../../components/Spinner';

interface Modal {
  show: boolean;
  data?: {
    name: string;
    data: {
      domain: string;
      test_domain: string;
    };
  };
}

interface UpgradePlan {
  data: any;
  name: string;
  subscription: any;
}

const Licenses = (props: any) => {
  return (
    <GlobalContextProvider>
      <UserContextProvider>
        <Web3ContextProvider autoLoad={true}>
          <LicensesApp {...props} />
        </Web3ContextProvider>
      </UserContextProvider>
    </GlobalContextProvider>
  );
};
const tableHead = [
  { title: 'Domain' },
  { title: 'Test Domain' },
  { title: 'License' },
  { title: 'Solution', sort: 'solution' },
  { title: 'Plan', sort: 'plan' },
  { title: '' },
  { title: '' },
];

const LicensesApp = ({ pricingDatas, pricingListID }: any) => {
  const { aesirxData, userLoading } = useUserContext();
  const [modal, setModal] = useState<Modal>({ show: false });
  const [upgradePlan, setUpgradePlan] = useState<UpgradePlan>();
  const [addNew, setAddNew] = useState<boolean>(false);
  const [orderSort, setOrderSort] = useState<any>({
    column: '',
    reverseOrder: false,
  });

  const billingList =
    aesirxData?.licenses?.length &&
    aesirxData?.licenses.filter((license: any) => {
      return license?.subscription?.[0]?.payment?.authorization;
    });

  const handleAction = (license: UpgradePlan, addNew = false) => {
    setAddNew(addNew);
    setUpgradePlan(license);
  };
  const CustomToggle = React.forwardRef<HTMLDivElement>(({ children, onClick }: any, ref) => (
    <div
      className="cursor-pointer"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));
  CustomToggle.displayName = 'CustomToggle';

  if (userLoading) {
    return <Spinner />;
  }

  if (upgradePlan?.name) {
    return (
      <UpgradeLicense
        license={upgradePlan}
        pricingListID={pricingListID}
        setUpgradePlan={setUpgradePlan}
        pricingDatas={pricingDatas}
        addNew={addNew}
      />
    );
  }
  const handleSort = (column?: string) => {
    if (!column) return;
    const newSort = {
      column: column,
      reverseOrder: column == orderSort.column ? !orderSort.reverseOrder : false,
    };

    if (aesirxData?.licenses?.length) {
      aesirxData?.licenses.sort((a: UpgradePlan, b: UpgradePlan) => {
        switch (column) {
          case 'solution':
            return (
              (a.subscription?.[0]?.product_name < b.subscription?.[0]?.product_name ? -1 : 1) *
              (newSort.reverseOrder ? -1 : 1)
            );
          case 'plan':
            return (
              (a.subscription?.[0]?.subscribed_package_name <
              b.subscription?.[0]?.subscribed_package_name
                ? -1
                : 1) * (newSort.reverseOrder ? -1 : 1)
            );
          default:
            return 0;
        }
      });
      setOrderSort(newSort);
    }
  };

  return (
    <>
      {modal?.data ? (
        <UpdateLicense data={modal?.data} show={modal.show} setShow={setModal} />
      ) : null}
      <div className="px-5 pt-3">
        <Row>
          <Col md={6}>
            {aesirxData?.sso_client_id && (
              <>
                <h3 className="fs-18 fw-semibold mb-3">SSO CLIENT ID</h3>
                <div className="mb-5 d-flex bg-white rounded border py-6px px-20px align-items-center justify-content-between">
                  <span className="overflow-hidden ms-3 py-2">{aesirxData?.sso_client_id}</span>
                  <ButtonCopy
                    content={aesirxData?.sso_client_id}
                    isBlack
                    className="bg-transparent border-0 text-dark"
                  />
                </div>
              </>
            )}
          </Col>
          <Col md={6}>
            {aesirxData?.sso_client_secret && (
              <>
                <h3 className="fs-18 fw-semibold mb-3">SSO CLIENT SECRECT</h3>
                <div className="mb-5 d-flex bg-white rounded border py-6px px-20px align-items-center justify-content-between">
                  <span className="overflow-hidden ms-3 py-2">
                    {shortenString(aesirxData?.sso_client_secret, 30, 10)}
                  </span>
                  <ButtonCopy
                    content={aesirxData?.sso_client_secret}
                    isBlack
                    className="bg-transparent border-0 text-dark"
                  />
                </div>
              </>
            )}
          </Col>
        </Row>
        {aesirxData?.licenses?.length && (
          <>
            <Row>
              <Col md={8} lg={7} xl={6} xxl={5}>
                <h3 className="fs-4 fw-semibold mb-2">AesirX License Hub</h3>
                <p className="text-gray-700">
                  Your one-stop shop for privacy-conscious marketing solutions. Register, manage,
                  and buy or upgrade licenses with USD or $AESIRX.
                </p>
              </Col>
            </Row>
            <Table
              hover
              className="bg-white fs-7 mb-5 text-gray-700 rounded shadow-table"
              striped
              borderless
              responsive
            >
              <thead className="border-bottom">
                <tr>
                  {tableHead.map((item: any, index: number) => {
                    return (
                      <th key={index} className="fw-semibold text-gray-700 text-nowrap">
                        {item.title}{' '}
                        {item.sort && (
                          <FontAwesomeIcon
                            onClick={() => handleSort(item.sort)}
                            className={`cursor-pointer ${
                              orderSort.column == item.sort ? 'text-success' : ''
                            } ${
                              orderSort.column == item.sort && orderSort.reverseOrder
                                ? ''
                                : 'align-baseline'
                            }`}
                            icon={
                              orderSort.column == item.sort && orderSort.reverseOrder
                                ? faSortUp
                                : faSortDown
                            }
                            width={14}
                            height={14}
                          />
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="text-gray-900">
                {aesirxData?.licenses?.map((license: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{license?.data?.domain}</td>
                      <td>{license?.data?.test_domain}</td>
                      <td>
                        <div className="d-flex">
                          {license?.name}{' '}
                          <ButtonCopy
                            content={license?.name}
                            isBlack
                            className="bg-transparent border-0 text-dark py-0"
                          />
                        </div>
                      </td>
                      <td className="text-nowrap">{license?.subscription?.[0]?.product_name}</td>
                      <td className="text-success text-cappitalize">
                        {license?.subscription?.[0]?.subscribed_package_name}
                      </td>
                      <td className="text-success">
                        <span
                          onClick={() => handleAction(license)}
                          className="cursor-pointer bg-success-dark text-white fs-8 fw-semibold py-2 px-3 rounded-1 text-nowrap"
                        >
                          Upgrade
                        </span>
                        <span
                          className="ms-2 cursor-pointer bg-success-dark text-white fs-8 fw-semibold py-2 px-3 rounded-1 text-nowrap"
                          onClick={() => handleAction(license, true)}
                        >
                          Add new
                        </span>
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                            <FontAwesomeIcon height={16} icon={faEllipsisVertical} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="fs-7">
                            <Dropdown.Item onClick={() => setModal({ show: true, data: license })}>
                              Edit
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
        {billingList?.length ? (
          <>
            <h3 className="fs-18 fw-semibold mb-3">Billing History</h3>
            <Table
              hover
              className="bg-white fs-7 text-gray-700 rounded shadow-table"
              striped
              borderless
              responsive
            >
              <thead className="border-bottom-2">
                <tr>
                  <th className="fw-semibold text-nowrap">ORDER ID</th>
                  <th className="fw-semibold text-nowrap">AESIRX SOLUTION</th>
                  <th className="fw-semibold text-nowrap">PLAN</th>
                  <th className="fw-semibold text-nowrap">AMOUNT</th>
                  <th className="fw-semibold text-nowrap">DATE</th>
                  {/* <th className="fw-semibold">RECEIPT</th> */}
                </tr>
              </thead>
              <tbody className="text-gray-900">
                {billingList?.map((bill: any, index: number) => {
                  const billData = JSON.parse(bill?.subscription?.[0]?.payment?.authorization);
                  return (
                    <tr key={index}>
                      <td>{billData?.id}</td>
                      <td className="fw-semibold">{bill?.subscription?.[0]?.product_name}</td>
                      <td className="text-success fw-semibold text-uppercase">
                        {bill?.subscription?.[0]?.subscribed_package_name}
                      </td>
                      <td>${bill?.subscription?.[0]?.payment.payment_amount}</td>
                      <td>
                        {dayjs(
                          bill?.subscription?.[0]?.subscription_data?.start_subscription_date
                        ).format('DD/MM/YYYY')}
                      </td>
                      {/* <td className="text-success fw-semibold">PDF</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : null}
      </div>
    </>
  );
};

export { Licenses };
