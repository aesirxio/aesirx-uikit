import React from 'react';
import { Button } from 'react-bootstrap';
import { isMobile, isDesktop, osName, OsTypes } from 'react-device-detect';
import { BROWSER_WALLET, WALLET_CONNECT } from '../../../store/UtilsStore/config';
import { Image } from 'components';
// import concordium_logo from '@/public/concordium.png';

const Connect = (props: any) => {
  console.log(props ,"tee");
  
  return (
    <div>
      {isDesktop && (
        <>
          <Button
            type="button"
            className={`fw-semibold text-white w-100 py-12px d-flex align-items-center justify-content-center mb-2`}
            variant={'success'}
            onClick={() => props.setActiveConnectorType(BROWSER_WALLET)}
          >
            {/* <Image src={concordium_logo} alt="concordium-logo" width={20} height={21} /> */}
            <span className="ms-2">Concordium Browser Wallet</span>
          </Button>
        </>
      )}
      {osName === OsTypes.IOS && isMobile ? (
        <></>
      ) : (
        !props.onlyBrowser && (
          <Button
            type="button"
            className={`fw-medium text-white w-100 minh-48px px-4 py-2 lh-sm d-flex align-items-center justify-content-center`}
            variant={props?.buttonVariant ? props?.buttonVariant : 'success'}
            onClick={() => props.setActiveConnectorType(WALLET_CONNECT)}
          >
            <div className="d-flex align-items-center text-start">
              <p className="mb-0 text-nowrap me-3 pe-3 border-end">QR Code</p>
              <p className="mb-0 fs-8 fw-normal">Concordium or CryptoX Mobile Wallets</p>
            </div>
          </Button>
        )
      )}
    </div>
  );
};

export default Connect;
