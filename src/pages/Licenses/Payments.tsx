import { useUserContext } from '../../providers/user';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { notify } from '../../components/Toast';
import io from 'socket.io-client';
import { Image } from '../../components/Image';
import aesirx_payment_icon from '../../assets/images/payment/aesirx.png';
import usdt from '../../assets/images/payment/usdt.png';
import bnb from '../../assets/images/payment/bnb.png';
import concordium from '../../assets/images/payment/concordium.png';
import visa from '../../assets/images/payment/visa.png';
import debit from '../../assets/images/payment/debit.png';
interface Props {
  item: any;
  license: any;
  show: boolean;
  setShow: any;
  backToLicense: any;
  subscription: any;
  addNew: boolean;
}

let socket: any;
const listPaymentSellix = [usdt, bnb, concordium, visa, debit];

const Payments = ({ item, license, show, setShow, backToLicense, subscription, addNew }: Props) => {
  const { aesirxData, preregistration } = useUserContext();
  const product = license?.subscription?.[0]?.product;
  const aesirxpackage = item?.title.toLowerCase();
  const [saving, setSaving] = useState(false);

  const handleAesirX = async () => {
    setSaving(true);
    try {
      const res = await axios.post(`/api/license`, {
        payment_method: 'aesirx',
        product: product,
        aesirxpackage: aesirxpackage,
        buyer_id: aesirxData.id,
        subscription_id: addNew ? '' : subscription?.id,
      });

      if (res?.data?.result) {
        notify(addNew ? 'Create successfully!' : 'Upgrade successfully!', 'success');

        backToLicense(true);
      } else {
        notify('Not enough', 'error');
        setShow(false);
      }
    } catch (error: any) {
      setSaving(false);
      notify(error?.response?.data?._messages?.[0]?.message || error?.message, 'error');
    }
  };

  useEffect(() => {
    (async () => {
      const createSocketServer = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_PARTNERS_URL}/api/socket`);
      };

      createSocketServer();

      if (!socket && process.env.NEXT_PUBLIC_PARTNERS_URL) {
        socket = io(process.env.NEXT_PUBLIC_PARTNERS_URL, {
          reconnection: true,
          secure: true,
          rejectUnauthorized: false,
          transports: ['polling'],
        });
      }

      socket.on('connect', () => {
        socket.on('web3id-update', (msg: any) => {
          const web3id = preregistration.id;

          if (msg === web3id) {
            notify(addNew ? 'Create successfully!' : 'Upgrade successfully!', 'success');
            backToLicense(true);
          }
        });
      });

      if (aesirxpackage === 'community') {
        await handleAesirX();
        setShow(false);
      }
    })();
    // eslint-disable-next-line no-console
  }, []);

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton className="border-0"></Modal.Header>
      <Modal.Body className="px-40px pb-5 pt-0">
        <div className="border-top pt-4">
          {saving ? (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          ) : (
            <>
              {' '}
              <p className="fs-6 fw-normal mb-4 text-dark">How would you like to pay?</p>
              <h3 className="fs-18 fw-medium text-dark mb-3">Token $AESIRX</h3>
              <Button
                className="border mb-4 rounded w-50 px-3 py-13px fs-18 d-flex align-items-center"
                variant="light"
                onClick={handleAesirX}
              >
                <Image
                  className="me-10px"
                  src={aesirx_payment_icon}
                  quality={100}
                  alt="Aesirx Payment Icon"
                />
                AesirX
              </Button>
              <h3 className="fs-18 fw-medium text-dark mb-3">
                Sellix Payment
                <span className="fs-6 fst-italic fw-normal">
                  (Support Crypto currencies, Credit/Debit Cards)
                </span>
              </h3>
              <div>
                <div
                  data-sellix-product={item?.plan_id}
                  data-sellix-custom-product={product}
                  data-sellix-custom-package={aesirxpackage}
                  data-sellix-custom-buyer_id={aesirxData.id}
                  data-sellix-custom-subscription_id={addNew ? '' : subscription?.id}
                  data-sellix-custom-addnew={addNew}
                  data-sellix-custom-requested_username={preregistration?.id}
                  className="d-flex flex-wrap cursor-pointer"
                >
                  {listPaymentSellix &&
                    listPaymentSellix.map((gateway, index) => {
                      return (
                        <Button
                          key={index}
                          className={`border rounded col px-3 py-10px ${
                            index ? 'ms-18px' : ''
                          } fs-18 d-flex align-items-center justify-content-center`}
                          variant="light"
                        >
                          <Image
                            className="rounded-1 object-fit-contain"
                            src={gateway}
                            quality={100}
                            width={27}
                            height={27}
                            alt="Aesirx Payment Icon"
                          />
                        </Button>
                      );
                    })}
                </div>
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Payments;