import CreateMarkup from '../../components/CreateMarkup';
import { useGlobalContext } from '../../providers/global';
import { useUserContext } from '../../providers/user';
import { getContent, getSubscriptionList } from '../../store/UtilsStore/aesirx';
import { faCheck, faCircleArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import CollapseItems from './CollapseItems';
import TooltipNote from './TooltipNote';
import Payments from './Payments';
import { Spinner } from '../../components/Spinner';

interface Props {
  pricingDatas: Array<any>;
  pricingListID: Array<any>;
  setUpgradePlan: any;
  license:
    | {
        data: any;
        name: string;
        subscription: any;
      }
    | undefined;

  addNew: boolean;
}

const UpgradeLicense = ({
  pricingDatas,
  setUpgradePlan,
  pricingListID,
  license,
  addNew,
}: Props) => {
  const [subscription, setSubscription] = useState<any>();
  const [fetch, setFetch] = useState(true);
  const { aesirxData, getData } = useUserContext();
  const { accessToken, jwt } = useGlobalContext();
  const [showPayment, setShowPayment] = useState(false);
  const [itemPay, setItemPay] = useState();

  useEffect(() => {
    (async () => {
      if (fetch) {
        try {
          const subscriptionList = await getSubscriptionList(
            aesirxData?.username,
            accessToken,
            license?.subscription?.[0]?.product
          );
          const subscription = subscriptionList.filter(
            (item: any) => item?.license == license?.name
          );
          setSubscription(subscription?.[0]);
          setFetch(false);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('getSubcription error', error);
          setFetch(false);
        }
      }
    })();
  }, []);

  const backToLicense = async (getNewData = false) => {
    setUpgradePlan();
    if (getNewData) {
      await getData(jwt, accessToken);
    }
  };

  const formatData = (data: Array<any>) => {
    let result;
    if (data?.length) {
      result = data?.map((list: any) => {
        const items = getContent(
          list?.desc_package_top,
          /<div\b[^>]*>([\s\S]*?)<\/div>/gi,
          /<\/?div[^>]*>/g
        );
        return items.map((item: string) => {
          const [title, content] = item.split(':');
          const noted = title.match(/<sup>(.*?)<\/sup>/);
          if (noted) {
            const newTitle = title.replace(/<sup>.*?<\/sup>/g, '');
            return {
              title: newTitle,
              content,
              noted: noted?.[1],
            };
          } else {
            return { title, content };
          }
        });
      });
    }
    return result;
  };

  // Packages Data
  const product = license?.subscription?.[0]?.product.split('-').pop();
  const listPricing = pricingDatas.filter((pricing: any) => {
    return pricing?.item_title?.includes(product);
  })?.[0]?.package?.decoded;
  const data = formatData(listPricing);

  // Payment Data
  const productID = license?.subscription?.[0]?.subscription_data?.product?.[0]?.split('|')?.[1];
  const listUpgrade = pricingListID?.map((product: any) => {
    const license = product?.subcription?.decoded?.find((license: any) => {
      return license?.product?.[0]?.split('|')?.[1] == productID;
    });
    return {
      ...license,
      title: product?.title,
      us_price: product?.us_price,
    };
  });
  const currentSubscription = license?.subscription?.[0]?.subscribed_package_name.toLowerCase();

  const handleBuy = (item: any) => {
    setItemPay(item);
    setShowPayment(true);
  };

  return fetch ? (
    <Spinner />
  ) : (
    <>
      {showPayment && (
        <Payments
          show={showPayment}
          setShow={setShowPayment}
          license={license}
          item={itemPay}
          backToLicense={backToLicense}
          subscription={subscription}
          addNew={addNew}
        />
      )}
      <p className="text-gray-700 cursor-pointer" onClick={() => backToLicense()}>
        <FontAwesomeIcon
          width={16}
          height={16}
          className="text-success me-2"
          icon={faCircleArrowLeft}
        />
        Back to Licenses
      </p>
      <h3 className="fw-semibold fs-4 mb-4">
        {addNew ? 'Register' : 'Upgrade'} {license?.subscription?.[0]?.product_name}
      </h3>
      <div className="d-none d-xl-block">
        <Table responsive bordered className="bg-white rounded">
          <thead>
            <tr>
              <th></th>
              {listUpgrade?.length ? (
                listUpgrade?.map((item: any, index: number) => {
                  const isCurrent = currentSubscription === item?.title?.toLowerCase();
                  return (
                    <th className="text-center align-baseline text-nowrap" key={index}>
                      <h3 className="fs-18 fw-medium mb-10px">
                        {item?.us_price ? item?.title : 'Open source'}
                      </h3>
                      <p className="fw-medium mb-0 text-secondary-50 fs-4">
                        {item?.us_price ? `$${item?.us_price}` : 'Free'}
                      </p>
                      <p
                        className="fw-medium text-secondary-50 fs-4"
                        style={{ visibility: !item?.us_price ? 'hidden' : 'visible' }}
                      >
                        {item?.us_price ? (
                          <>
                            {parseInt(item?.us_price.replace(',', '')) * 2}{' '}
                            <span className="fs-6">$AESIRX</span>
                          </>
                        ) : (
                          'Free'
                        )}
                      </p>
                      <div
                        className={
                          !isCurrent && item?.title?.toLowerCase() === 'community' ? 'd-none' : ''
                        }
                      >
                        <Button
                          className="fs-7 fw-semibold py-10px w-100"
                          variant="success"
                          disabled={addNew ? false : isCurrent}
                          onClick={() => handleBuy(item)}
                        >
                          {addNew ? 'Register' : isCurrent ? 'Current Plan' : 'Upgrade'}
                        </Button>
                      </div>
                    </th>
                  );
                })
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody>
            {data?.[0]?.length ? (
              data?.[0]?.map((row: any, rowIndex: number) => {
                return (
                  <tr key={rowIndex}>
                    {data?.map((col: any, colIndex: number) => {
                      return (
                        <Fragment key={colIndex}>
                          {!colIndex && (
                            <td className="text-start align-middle">
                              <div className="d-flex justify-content-between align-items-center">
                                <CreateMarkup htmlString={col[rowIndex]?.title} />
                                {col[rowIndex]?.noted && (
                                  <TooltipNote placement="right" content={col[rowIndex].noted} />
                                )}
                              </div>
                            </td>
                          )}
                          <td className="align-middle text-center">
                            {col[rowIndex]?.content === 'true' ? (
                              <FontAwesomeIcon
                                className="text-success"
                                width={16}
                                height={16}
                                icon={faCheck}
                              />
                            ) : col[rowIndex]?.content === 'false' ? (
                              <FontAwesomeIcon
                                className="text-danger"
                                width={16}
                                height={16}
                                icon={faXmark}
                              />
                            ) : (
                              <CreateMarkup htmlString={col[rowIndex]?.content} />
                            )}
                          </td>
                        </Fragment>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center" colSpan={6}>
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="d-xl-none">
        <Row>
          {listUpgrade?.map((item: any, index: number) => {
            const isCurrent = currentSubscription === item?.title?.toLowerCase();
            return (
              <Col key={index} sm={6} className="mb-30px">
                <div className="bg-white rounded p-4">
                  <h3 className="fs-18 fw-medium mb-2 text-capitalize">
                    {item?.us_price ? item?.title : 'Open source'}
                  </h3>
                  <p className="pb-2 mb-10px border-bottom fs-4 fw-medium text-secondary-50">
                    {listUpgrade?.[index]?.us_price ? (
                      <>
                        {item?.us_price ? `$${item?.us_price}` : 'Free'}
                        <span className="fs-6 text-body fw-normal">/Month</span>
                      </>
                    ) : (
                      'Free'
                    )}
                  </p>
                  <CollapseItems list={data?.[index]} />
                  <Button
                    variant="success"
                    className="fs-7 fw-semibold py-2 mt-2 w-100"
                    disabled={addNew ? false : isCurrent}
                    onClick={() => handleBuy(item)}
                  >
                    {addNew ? 'Register' : isCurrent ? 'Current Plan' : 'Update'}
                  </Button>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default UpgradeLicense;
