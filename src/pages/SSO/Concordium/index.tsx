import React, { useState } from 'react';
// import concordium_logo from '@/public/concordium_black.png';
import { useWeb3Context } from '../../../providers/web3';
import { Image } from 'components';
import { useUserContext } from '../../../providers/user';
import Connect from './Connect';
import { Button } from 'react-bootstrap';
import ButtonCopy from '../../../components/ButtonCopy';
import { shortenString } from '../../../store/UtilsStore/web3';
interface Props {
  connectWallet: (address: string, walletType: string) => Promise<void>;
  setShow: any;
}

const Concordium = ({ connectWallet, setShow }: Props) => {
  const { account, setActiveConnectorType } = useWeb3Context();
 
  const { aesirxData } = useUserContext();
  const [connecting, setConnecting] = useState(false);
  

  const walletAddress = aesirxData?.wallet_concordium ? aesirxData?.wallet_concordium : account;

  const hanleConnect = async (address: string, walletType: string) => {
    setConnecting(true);
    await connectWallet(address, walletType);
    setConnecting(false);
  };

  return (
    <div className="py-2rem px-4 border rounded">
      <h3 className="fw-semibold fs-18 mb-12px">
        <Image
          className="me-14px"
          //   src={concordium_logo}
          width={40}
          height={40}
          alt="logo concordium"
        />
        Concordium
      </h3>
      <p className="fw-medium mb-12px">Address</p>
      <div className="position-relative overflow-hidden fs-7 mb-12px py-12px px-3 bg-gray-100 rounded border border-gray-stoke-1">
        <span className="fw-normal">
          {!walletAddress ? 'Not Connect!' : shortenString(walletAddress, 20, 6)}
        </span>
        <ButtonCopy
          content={aesirxData?.wallet_concordium}
          className=" border-0 top-0 bottom-0 p-0 px-2 bg-gray-100 position-absolute end-0"
        />
      </div>
      {!aesirxData?.wallet_concordium && (
        <>
          {account ? (
            <Button
              disabled={connecting}
              onClick={() => {
                !account ? open() : hanleConnect(account, 'concordium');
              }}
              variant="success"
              className="fw-semibold py-12px py-12px w-100"
            >
              {account ? 'Connect this address' : 'Connect to Ethereum wallets'}
            </Button>
          ) : (
            <Connect setActiveConnectorType={setActiveConnectorType} />
          )}
        </>
      )}
      {aesirxData?.wallet_concordium && (
        <Button
          onClick={() =>
            setShow({
              show: true,
              data: {
                wallet: 'concordium',
                address: aesirxData?.wallet_concordium,
              },
            })
          }
          variant="danger"
          className="fw-semibold py-12px py-12px w-100"
        >
          Disconnect
        </Button>
      )}
    </div>
  );
};

export default Concordium;
