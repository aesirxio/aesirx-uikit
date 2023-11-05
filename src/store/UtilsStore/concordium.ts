import { TESTNET, MAINNET, Network } from '@concordium/react-components';
import {
  AccountAddress,
  AccountTransactionType,
  CcdAmount,
  deserializeReceiveReturnValue,
  SchemaVersion,
  TransactionStatusEnum,
} from '@concordium/web-sdk';

import { Buffer } from 'buffer/';

async function waitForFinalizedTransaction(transactionHash: any, connection: any) {
  let transactionStatus = null;
  let txnStatus = null;
  const client = await connection.getJsonRpcClient();

  while (transactionStatus !== TransactionStatusEnum.Finalized) {
    txnStatus = await client.getTransactionStatus(transactionHash);
    transactionStatus = txnStatus?.status;
    // eslint-disable-next-line no-console
    console.info(`txn : ${transactionHash}, status: ${txnStatus?.status}`);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
  }
  // eslint-disable-next-line no-console
  console.log('Transaction has been finalized', txnStatus);
  return ensureValidOutcome(txnStatus?.outcomes);
}

const ensureValidOutcome = (outcomes: any) => {
  if (!outcomes) {
    throw Error('Null Outcome');
  }

  const successTxnSummary = Object.keys(outcomes)
    .map((k) => outcomes[k])
    .find((s) => s.result.outcome === 'success');

  if (!successTxnSummary) {
    const failures = Object.keys(outcomes)
      .map((k) => outcomes[k])
      .filter((s) => s.result.outcome === 'reject')
      .map((s) => s.result.rejectReason.tag)
      .join(',');
    throw Error(`Transaction failed, reasons: ${failures}`);
  }

  return successTxnSummary;
};

const updateSmartContract = async (
  connection: any,
  account: any,
  name: any,
  amount: any,
  index: any,
  subIndex: any,
  schema: any,
  method: any,
  params = {}
) => {
  try {
    const txnHash = await connection.signAndSendTransaction(
      account,
      AccountTransactionType.Update,
      {
        amount: toCcd(BigInt(amount)),
        address: {
          index: BigInt(index),
          subindex: BigInt(subIndex),
        },
        receiveName: `${name}.${method}`,
        maxContractExecutionEnergy: BigInt(6000),
      },
      params,
      schema
    );

    return await waitForFinalizedTransaction(txnHash, connection);
  } catch (error: any) {
    throw Error(error);
  }
};

const invokeSmartContract = async (
  connection: any,
  account: any,
  name: any,
  index: any,
  subIndex: any,
  schema: any,
  method: any
) => {
  try {
    const client = await connection.getJsonRpcClient();

    const rawReturnValue = await client.invokeContract({
      invoker: new AccountAddress(account),
      contract: { index: BigInt(index), subindex: BigInt(subIndex) },
      method: `${name}.${method}`,
    });

    const returnValue = await deserializeReceiveReturnValue(
      Buffer.from(rawReturnValue.returnValue, 'hex'),
      Buffer.from(schema, 'base64'),
      name,
      method,
      SchemaVersion.V2
    );
    // eslint-disable-next-line no-console
    console.log('invokeSmartContract', returnValue);

    return returnValue;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('invokeSmartContract error', error);
    return null;
  }
};

const checkPaid = async (account: any, connection: any, web3id: any) => {
  const data = await invokeSmartContract(
    connection,
    account,
    process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_NAME,
    process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_INDEX,
    process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_SUBINDEX,
    process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_RAWSCHEMA,
    'view'
  );
  // eslint-disable-next-line no-console
  console.log('checkPaid', web3id, data, data?.paid_web3ids.includes(web3id));

  if (data) {
    return data?.paid_web3ids.includes(web3id);
  }
};

const pay = async (account: any, connection: any, web3id: any) => {
  try {
    const outcomes = await updateSmartContract(
      connection,
      account,
      process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_NAME,
      process.env.NEXT_PUBLIC_CONCORDIUM_NETWORK === 'testnet' ? 100 : 30,
      process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_INDEX,
      process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_SUBINDEX,
      process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_RAWSCHEMA,
      'pay',
      {
        web3id: web3id,
      }
    );

    return outcomes;
  } catch (error: any) {
    throw error;
  }
};

const mintWeb3IDNFT = async (account: any, connection: any, web3id: any) => {
  try {
    return await updateSmartContract(
      connection,
      account,
      process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_NAME,
      0,
      process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_INDEX,
      process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_SUBINDEX,
      process.env.NEXT_PUBLIC_SMARTCONTRACT_WHITELIST_RAWSCHEMA,
      'mint_web3id',
      {
        web3id: web3id,
      }
    );
  } catch (error: any) {
    throw Error(error);
  }
};

const checkMintWeb3IDNFT = async (account: any, connection: any) => {
  const data = await invokeSmartContract(
    connection,
    account,
    process.env.NEXT_PUBLIC_SMARTCONTRACT_NFT_WEB3ID_NAME,
    process.env.NEXT_PUBLIC_SMARTCONTRACT_NFT_WEB3ID_INDEX,
    process.env.NEXT_PUBLIC_SMARTCONTRACT_NFT_WEB3ID_SUBINDEX,
    process.env.NEXT_PUBLIC_SMARTCONTRACT_NFT_WEB3ID_RAWSCHEMA,
    'view'
  );
  // eslint-disable-next-line no-console
  console.log(
    'checkMintWeb3IDNFT',
    account,
    data,
    data?.state?.some((arrVal: any) => account === arrVal[0]?.Account[0])
  );

  if (data) {
    return data?.state?.some((arrVal: any) => account === arrVal[0]?.Account[0]);
  }
};

const MICRO_CCD_IN_CCD = 1000000;

const toCcd = (ccdAmount: any) => {
  return new CcdAmount(ccdAmount * BigInt(MICRO_CCD_IN_CCD));
};

const transactionLink = (network: Network, txHash: string) => {
  return `${network.ccdScanBaseUrl}/?dcount=1&dentity=transaction&dhash=${txHash}`;
};

const checkNetwork = (hash: string) => {
  switch (process.env.NEXT_PUBLIC_CONCORDIUM_NETWORK) {
    case 'testnet':
      return hash === TESTNET.genesisHash;

    default:
      return hash === MAINNET.genesisHash;
  }
};

export {
  waitForFinalizedTransaction,
  updateSmartContract,
  invokeSmartContract,
  checkPaid,
  pay,
  mintWeb3IDNFT,
  checkMintWeb3IDNFT,
  transactionLink,
  checkNetwork,
  toCcd,
  ensureValidOutcome,
};