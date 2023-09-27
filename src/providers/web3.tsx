import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { BROWSER_WALLET, WALLET_CONNECT } from '../store/UtilsStore/config';

// import { toast } from 'react-toastify';
// import Toast from '@/components/Toast';
import { checkNetwork } from '../store/UtilsStore/concordium';
import { useUserContext } from './user';
import secureLocalStorage from 'react-secure-storage';
import {
  WithWalletConnector,
  ConnectorType,
  Network,
  WalletConnector,
  withJsonRpcClient,
  useConnect,
  useConnection,
  MAINNET,
  TESTNET,
  BrowserWalletConnector,
} from '@concordium/react-components';
import { isMobile } from 'react-device-detect';
import { log } from 'console';
interface Web3ContextType {
  account?: string;
  setActiveConnectorType?: any;
  connection?: any;
  isConnecting?: any;
}

interface Props {
  autoLoad: boolean;
  children?: ReactNode;
}

interface AppProps {
  network: Network;
  setActiveConnectorType: (type: ConnectorType | undefined) => void;
  activeConnectorType: ConnectorType | undefined;
  activeConnector: WalletConnector | undefined;
  activeConnectorError: string;
  connectedAccounts: any;
  genesisHashes: any;
  autoLoad?: boolean;
  children?: ReactNode;
}
declare global {
  interface Window {
    concordium: any;
  }
}

const Web3Context = createContext<Web3ContextType>({});

const Web3ContextProvider: React.FC<Props> = ({ children, autoLoad }) => {
  return (
    <WithWalletConnector
      network={process.env.NEXT_PUBLIC_CONCORDIUM_NETWORK === 'mainnet' ? MAINNET : TESTNET}
    >
      {(props) => (
        <Web3ContextApp {...props} autoLoad={autoLoad}>
          {children}
        </Web3ContextApp>
      )}
    </WithWalletConnector>
  );
};

const Web3ContextApp: React.FC<AppProps> = ({ children, ...props }) => {
  console.log(props, '11');

  const {
    activeConnectorError,
    network,
    connectedAccounts,
    genesisHashes,
    activeConnector,
    setActiveConnectorType,
    activeConnectorType,
    autoLoad = true,
  } = props;

  const { setConnection, account, connection, genesisHash } = useConnection(
    connectedAccounts,
    genesisHashes
  );

  const { connect, connectError, isConnecting } = useConnect(activeConnector, setConnection);
  const [, setRpcGenesisHash] = useState<string>();

  const { preregistration } = useUserContext();

  useEffect(() => {
    if (activeConnector) {
      connect();
    }
  }, [activeConnector, connect]);

  useEffect(() => {
    if (connectError) {
      // toast.error(<Toast status={false} message={connectError} />);
    }
  }, [connectError]);

  useEffect(() => {
    if (activeConnectorError) {
      // toast.error(<Toast status={false} message={activeConnectorError} />);
    }
  }, [activeConnectorError]);

  useEffect(() => {
    const connection = secureLocalStorage.getItem('concordium');
    if (connection === 'browser' && autoLoad) {
      setActiveConnectorType(BROWSER_WALLET);
    } else if (connection === 'walletconnect') {
      // setActiveConnectorType(WALLET_CONNECT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (connection) {
      setRpcGenesisHash(undefined);
      withJsonRpcClient(connection, async (rpc) => {
        const status = await rpc.getConsensusStatus();

        return status.genesisBlock;
      })
        .then(async (hash) => {
          if (!checkNetwork(hash)) {
            throw new Error(
              `Please change the network to ${process.env.NEXT_PUBLIC_CONCORDIUM_NETWORK} in Wallet`
            );
          }

          setRpcGenesisHash(hash);
          secureLocalStorage.setItem(
            'concordium',
            activeConnector instanceof BrowserWalletConnector ? 'browser' : 'walletconnect'
          );
        })
        .catch((err) => {
          if (err) {
            // toast.error(<Toast status={false} message={err.message} />);
          }

          connection.disconnect();
          setRpcGenesisHash(undefined);
          setActiveConnectorType(undefined);
        });
    }
  }, [account, connection, genesisHash, network, preregistration?.id, setActiveConnectorType]);

  return (
    <Web3Context.Provider
      value={{
        account: account,
        setActiveConnectorType: setActiveConnectorType,
        connection: connection,
        isConnecting: isConnecting,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

const useWeb3Context = () => useContext(Web3Context);

export { Web3ContextProvider as default, useWeb3Context };
