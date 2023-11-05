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
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
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

const LicensesApp = ({ pricingDatas, pricingListID }: any) => {
  const { aesirxData, userLoading } = useUserContext();
  const [modal, setModal] = useState<Modal>({ show: false });
  const [upgradePlan, setUpgradePlan] = useState<UpgradePlan>();
  const [addNew, setAddNew] = useState<boolean>(false);

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

  return (
    <>
      {modal?.data ? (
        <UpdateLicense data={modal?.data} show={modal.show} setShow={setModal} />
      ) : null}
      <Row>
        <Col md={6}>
          {aesirxData?.sso_client_id && (
            <>
              <h3 className="fs-18 fw-semibold mb-3">SSO CLIENT ID</h3>
              <div className="mb-5 d-flex bg-white rounded border py-6px px-20px align-items-center justify-content-between">
                <span className="overflow-hidden">{aesirxData?.sso_client_id}</span>
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
                <span className="overflow-hidden">
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
          <h3 className="fs-18 fw-semibold mb-3">Licenses</h3>
          <Table
            hover
            className="bg-white fs-7 mb-5 text-gray-700 rounded shadow-table"
            striped
            borderless
            responsive
          >
            <thead className="border-bottom">
              <tr>
                <th className="fw-semibold text-gray-700 text-nowrap">Domain</th>
                <th className="fw-semibold text-gray-700 text-nowrap">Test Domain</th>
                <th className="fw-semibold text-gray-700 text-nowrap">License</th>
                <th className="fw-semibold text-gray-700 text-nowrap">Solution</th>
                <th className="fw-semibold text-gray-700 text-nowrap">Plan</th>
                <th className="fw-semibold text-gray-700 text-nowrap"></th>
                <th className="fw-semibold text-gray-700 text-nowrap"></th>
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
                        className="cursor-pointer bg-success-dark text-white fs-8 fw-semibold py-6px px-3 rounded-1 text-nowrap"
                      >
                        Upgrade
                      </span>
                      <span
                        className="ms-2 cursor-pointer bg-success-dark text-white fs-8 fw-semibold py-6px px-3 rounded-1 text-nowrap"
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
            <thead className="border-bottom">
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
    </>
  );
};

export { Licenses };
