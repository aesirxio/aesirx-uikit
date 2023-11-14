import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { BROWSER_WALLET } from '../store/UtilsStore/config';

import { notify } from '../components/Toast';
import { checkNetwork } from '../store/UtilsStore/concordium';
import { useUserContext } from './user';
import secureLocalStorage from 'react-secure-storage';
import {
  WithWalletConnector,
  ConnectorType,
  Network,
  WalletConnector,
  useConnect,
  useConnection,
  MAINNET,
  TESTNET,
  useGrpcClient,
} from '@concordium/react-components';

import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import { toast } from 'react-toastify';
interface Web3ContextType {
  account: string;
  setActiveConnectorType?: any;
  connection?: any;
  isConnecting?: any;
  gRPCClient?: ConcordiumGRPCClient;
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

const Web3Context = createContext<Web3ContextType>({
  account: '',
});

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
  const {
    activeConnectorError,
    network,
    connectedAccounts,
    genesisHashes,
    activeConnector,
    setActiveConnectorType,
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
      notify(connectError, 'error');
    }
  }, [connectError]);

  useEffect(() => {
    if (activeConnectorError) {
      notify(activeConnectorError, 'error');
    }
  }, [activeConnectorError]);

  useEffect(() => {
    const connection = secureLocalStorage.getItem('concordium');
    if (connection === 'browser' && autoLoad) {
      setActiveConnectorType(BROWSER_WALLET);
    } else if (connection === 'walletconnect') {
      // setActiveConnectorType(WALLET_CONNECT);
    }
    // eslint-disable-next-line no-console
  }, []);

  const gRPCClient = useGrpcClient(network);

  useEffect(() => {
    if (gRPCClient) {
      setRpcGenesisHash(undefined);
      gRPCClient
        .getConsensusStatus()
        .then((status) => {
          return status.genesisBlock;
        })

        .then(async (hash: any) => {
          if (!checkNetwork(hash)) {
            throw new Error(
              `Please change the network to ${process.env.NEXT_PUBLIC_CONCORDIUM_NETWORK} in Wallet`
            );
          }

          setRpcGenesisHash(hash);
        })
        .catch((err) => {
          setRpcGenesisHash(undefined);
          toast(err.message);
        });
    }
  }, [gRPCClient]);

  return (
    <Web3Context.Provider
      value={{
        account: account ?? '',
        setActiveConnectorType: setActiveConnectorType,
        connection: connection,
        isConnecting: isConnecting,
        gRPCClient: gRPCClient,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

const useWeb3Context = () => useContext(Web3Context);

export { Web3ContextProvider as default, useWeb3Context };
