import { SignClientTypes } from '@walletconnect/types';
import {
  ephemeralConnectorType,
  WalletConnectConnector,
  BrowserWalletConnector,
  CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
} from '@concordium/react-components';

const WALLET_CONNECT_OPTS: SignClientTypes.Options = {
  projectId: CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
  metadata: {
    name: 'AesirX Shield of Privacy',
    description: 'AesirX Shield of Privacy is our privacy-first security Solution.',
    url: 'https://aesirx.io/',
    icons: ['https://walletconnect.com/walletconnect-logo.png'],
  },
};

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);
export const WALLET_CONNECT = ephemeralConnectorType(
  WalletConnectConnector.create.bind(this, WALLET_CONNECT_OPTS as any)
);
