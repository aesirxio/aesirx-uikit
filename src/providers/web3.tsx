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
  withJsonRpcClient,
  useConnect,
  useConnection,
  MAINNET,
  TESTNET,
  BrowserWalletConnector,
} from '@concordium/react-components';

import { ConcordiumGRPCClient, createConcordiumClient } from '@concordium/web-sdk';
interface Web3ContextType {
  account: string;
  setActiveConnectorType?: any;
  connection?: any;
  isConnecting?: any;
  gRPCClient: ConcordiumGRPCClient;
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
  gRPCClient: createConcordiumClient(
    process.env.NEXT_PUBLIC_GRPC2_URL ?? '',
    parseInt(process.env.NEXT_PUBLIC_GRPC2_PORT ?? '0')
  ),
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
            notify(err.message, 'error');
          }

          connection.disconnect();
          setRpcGenesisHash(undefined);
          setActiveConnectorType(undefined);
        });
    }
  }, [account, connection, genesisHash, network, preregistration?.id, setActiveConnectorType]);

  const gRPCClient = createConcordiumClient(
    process.env.NEXT_PUBLIC_GRPC2_URL ?? '',
    parseInt(process.env.NEXT_PUBLIC_GRPC2_PORT ?? '0')
  );

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
