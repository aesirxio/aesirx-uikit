import axios from 'axios';
import { stringMessage } from '@concordium/react-components';
import { env } from 'aesirx-lib';
const createPreregistration = async (data: any, jwt: any) => {
  try {
    return await axios.post(`${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
    });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

const activation = async (web3id: any, code: any) => {
  return await axios.put(
    `${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/activation/${web3id}/${code}`
  );
};

const getNonce = async (accountAddress: any, connection: any, text: string = '') => {
  try {
    const nonce = (
      await axios.get(
        `${env.REACT_APP_WEB3_API_ENDPOINT}/account/${accountAddress}/nonce?text=${text}`
      )
    ).data.nonce;

    const signature = await connection.signMessage(accountAddress, stringMessage(`${nonce}`));

    const signedNonce = Buffer.from(
      typeof signature === 'object' && signature !== null ? JSON.stringify(signature) : signature,
      'utf-8'
    ).toString('base64');

    return signedNonce;
  } catch (error) {
    throw error;
  }
};

const getPreregistration = async (jwt: any) => {
  return await axios.get(`${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/aesirx`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jwt,
    },
  });
};

const getDemoData = async (jwt: any) => {
  try {
    return await axios.get(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/demo/${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error) {
    return { data: { objForm: false } };
  }
};

const linkAccount = async (web3Id: any, accountAddress: any, signedNonce: any) => {
  try {
    return await axios.put(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/id/${web3Id}/account/${accountAddress}/?signature=${signedNonce}&network=${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}`
    );
  } catch (error) {
    throw error;
  }
};

const linkAesirXAccount = async (web3id: any, jwt: any) => {
  await axios.put(
    `${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/aesirx/${web3id}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
    }
  );
};

const getNonceAesirX = async (accountAddress: any, connection: any) => {
  try {
    const nonce = (
      await axios.post(
        `${env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?api=hal&option=member&task=getWalletNonce&webserviceClient=site&webserviceVersion=1.0.0`,
        {
          publicAddress: accountAddress,
          wallet: 'concordium',
          text: 'Get data: {}',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    ).data.result;

    const signature = await connection.signMessage(accountAddress, stringMessage(`${nonce}`));

    const signedNonce = Buffer.from(
      typeof signature === 'object' && signature !== null ? JSON.stringify(signature) : signature,
      'utf-8'
    ).toString('base64');

    return signedNonce;
  } catch (error) {
    throw error;
  }
};

const loginAesirXAccount = async (accountAddress: any, signedNonce: any) => {
  try {
    return await axios.post(
      `${env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?api=hal&option=member&task=walletLogin&webserviceClient=site&webserviceVersion=1.0.0`,
      {
        publicAddress: accountAddress,
        wallet: 'concordium',
        signature: JSON.parse(Buffer.from(signedNonce, 'base64').toString()),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: any) {
    throw Error(error);
  }
};

const createAesirXAccount = async (accountAddress: any, connection: any, email: string) => {
  try {
    const nonce = (
      await axios.post(
        `${env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=reditem&view=item_wallet_requests_66&api=hal`,
        {
          public_address: accountAddress,
          wallet: 'concordium',
          text: 'Create AesirX Account : {}',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    ).data?.nonce;

    const signature = await connection.signMessage(accountAddress, stringMessage(`${nonce}`));

    const signedNonce =
      typeof signature === 'object' && signature !== null ? signature : JSON.parse(signature);

    const aesirXID = (
      await axios.post(
        `${env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=reditem&view=item_wallet_requests_66&task=validateSignature&api=hal`,
        {
          public_address: accountAddress,
          wallet: 'concordium',
          signature: signedNonce,
          email: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    ).data?.result?.id;

    return aesirXID;
  } catch (error) {
    throw error;
  }
};

const savePreregistration = async (jwt: any, data: any) => {
  try {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('first_name', data.first_name);
    formData.append('sur_name', data.sur_name);
    formData.append('organization', data.organization);
    formData.append('avatar', data.avatar);

    return await axios.put(`${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration`, data, {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: 'Bearer ' + jwt,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

const joinTestnet = async (accountAddress: any, signedNonce: any, jwt: any) => {
  try {
    return await axios.put(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}/add/${accountAddress}?signature=${signedNonce}&network=${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error: any) {
    throw Error(error?.response?.data?.error);
  }
};

const addWhitelist = async (jwt: any) => {
  try {
    return await axios.post(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/demo/whitelist/${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error: any) {
    throw Error(error?.response?.data?.error);
  }
};

const transactionWeb3NFT = async (jwt: any, transaction: any) => {
  try {
    return await axios.put(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/demo/nft/web3id/${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}/${transaction}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error: any) {
    throw Error(error?.response?.data?.error);
  }
};

const getNFTMetaData = async (jwt: any) => {
  try {
    return await axios.get(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/interests/${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error) {
    return { data: {} };
  }
};

const createInterests = async (jwt: any, web3id: any, interests: any) => {
  try {
    const formData: any = {};
    formData['id'] = web3id;
    formData['network'] = env.NEXT_PUBLIC_CONCORDIUM_NETWORK;
    Object.keys(interests).forEach((index: any) => {
      formData['interests[' + index + ']'] = interests[index];
    });
    return await axios.post(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/interests/${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

const updateInterests = async (jwt: any, web3id: any, interests: any) => {
  try {
    const formData: any = {};
    formData['id'] = web3id;
    formData['network'] = env.NEXT_PUBLIC_CONCORDIUM_NETWORK;
    Object.keys(interests).forEach((index: any) => {
      formData['interests[' + index + ']'] = interests[index];
    });
    return await axios.put(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/interests/${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

const getWe3IdMetadata = async (web3id: any) => {
  try {
    return await axios.get(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/demo/${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}/web3id/${web3id}`
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const shortenString = (str: any, first: any = 6, last: any = 4) => {
  return str?.substring(0, first) + '...' + str?.substring(str.length - last);
};

const walletLogin = async (wallet: any, accountAddress: any, signedNonce: any) => {
  try {
    const data = (
      await axios.post(
        `${env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?api=hal&option=member&task=walletLogin&webserviceClient=site&webserviceVersion=1.0.0`,
        {
          wallet: wallet,
          publicAddress: accountAddress,
          signature: signedNonce,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    ).data?.result;

    return data;
  } catch (error) {
    throw error;
  }
};

const acceptConsent = async (jwt: any, web3id: any) => {
  try {
    const signatureJson = JSON.stringify({
      id: web3id,
      url: 'web3id.aesirx.io',
      consent: 'interests',
    });
    const signature = Buffer.from(signatureJson).toString('base64');
    return await axios.put(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/interests/${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}/consent?signature=${signature}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error: any) {
    throw error;
  }
};

const claimCCD = async (jwt: any) => {
  try {
    return await axios.put(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/claimccd_60`,
      { network: env.NEXT_PUBLIC_CONCORDIUM_NETWORK },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error: any) {
    throw error;
  }
};

const claimCCD40 = async (jwt: any) => {
  try {
    return await axios.put(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/claimccd_40`,
      { network: env.NEXT_PUBLIC_CONCORDIUM_NETWORK },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error: any) {
    throw error;
  }
};

const claimAESIRX = async (jwt: any) => {
  try {
    return await axios.put(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/claimaesirx`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error: any) {
    throw error;
  }
};

const claimOldShare2Earn = async (jwt: any) => {
  try {
    return await axios.put(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/claimshare2earn`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error: any) {
    throw error;
  }
};

const checkAccountAvailable = async (accountAddress: any) => {
  try {
    return (
      await axios.get(
        `${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/checkwallet/${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}/${accountAddress}`
      )
    ).data.result;
  } catch (error) {
    return true;
  }
};

const validateWeb3Id = async (id: any) => {
  try {
    return !(await axios.get(`${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/checkid/${id}`))
      .data.result;
  } catch (error) {
    return false;
  }
};

const validateEmail = async (email: any) => {
  try {
    const [validateOnWeb3id, validateOnAesirx] = await Promise.all([
      !(await axios.get(`${env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/checkemail/${email}`))
        .data.result,
      !(
        await axios.post(
          `${env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=checkEmailIsUsed&api=hal`,
          {
            email: email,
          }
        )
      ).data.result,
    ]);
    return validateOnWeb3id && validateOnAesirx;
  } catch (error) {
    return false;
  }
};
const getPoolList = async (isFeature?: any) => {
  try {
    return await axios.get(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/stakepool${isFeature ? '?pool_feature=true' : ''}`
    );
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('error', error);
  }
};

const stake = async (amount: number, id: any, jwt: any) => {
  try {
    return await axios.put(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/demo/${env.NEXT_PUBLIC_CONCORDIUM_NETWORK}/stake/${id}/${amount}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error: any) {
    throw error;
  }
};

const getShare2Earn = async (jwt: any) => {
  try {
    return await axios.get(`${env.REACT_APP_WEB3_API_ENDPOINT}/share2earn`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getShare2EarnList = async (isActive: any = false) => {
  try {
    return await axios.get(
      `${env.REACT_APP_WEB3_API_ENDPOINT}/share2earn/list${isActive ? '?active=true' : ''}`
    );
  } catch (error) {
    throw error;
  }
};

const autoRegisterWeb3id = async (
  data: any,
  clientJwt: any,
  signedNonce: any,
  walletAccount: any
) => {
  try {
    return await axios.post(`/api/autocreate`, {
      data,
      clientJwt,
      signedNonce,
      walletAccount,
    });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('autoRegisterWeb3id', error);
    throw error;
  }
};

const getStatistic = async () => {
  try {
    return await axios.get(`${process?.env?.REACT_APP_WEB3_API_ENDPOINT}/statistic`);
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('getStatistic', error);
    throw error;
  }
};
const claimNFT = async (jwt: any) => {
  try {
    return await axios.post(
      `${process?.env?.REACT_APP_WEB3_API_ENDPOINT}/aesirx/account/claim`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      }
    );
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('claimNFT', error);
    throw error;
  }
};
const getChallenge = async (walletAccount: string) => {
  try {
    return (
      await axios.get(
        `${process?.env?.REACT_APP_WEB3_API_ENDPOINT}/challenge?account=${walletAccount}`
      )
    ).data?.challenge;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('getChallenge', error);
    throw error;
  }
};

const getStatement = async () => {
  try {
    return (await axios.get(`${process?.env?.REACT_APP_WEB3_API_ENDPOINT}/statement`)).data;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('getChallenge', error);
    throw error;
  }
};

const verifyProof = async (challenge: any, proof: any) => {
  try {
    return (
      await axios.post(
        `${process?.env?.REACT_APP_WEB3_API_ENDPOINT}/prove`,
        {
          challenge: challenge,
          proof: proof,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    ).data?.result;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('getChallenge', error);
    throw error;
  }
};

const getAffiliate2earn = async (jwt: any) => {
  try {
    return await axios.get(`${process?.env?.REACT_APP_WEB3_API_ENDPOINT}/affitiliate2earn `, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
    });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('getAffiliate2earn', error);
    throw error;
  }
};

export {
  createPreregistration,
  activation,
  getNonce,
  getPreregistration,
  getShare2Earn,
  getShare2EarnList,
  linkAccount,
  linkAesirXAccount,
  getNonceAesirX,
  loginAesirXAccount,
  createAesirXAccount,
  savePreregistration,
  shortenString,
  joinTestnet,
  addWhitelist,
  getWe3IdMetadata,
  transactionWeb3NFT,
  createInterests,
  updateInterests,
  getDemoData,
  getNFTMetaData,
  walletLogin,
  acceptConsent,
  claimCCD,
  claimAESIRX,
  claimOldShare2Earn,
  checkAccountAvailable,
  validateWeb3Id,
  stake,
  getPoolList,
  claimCCD40,
  autoRegisterWeb3id,
  validateEmail,
  getStatistic,
  claimNFT,
  getChallenge,
  getStatement,
  verifyProof,
  getAffiliate2earn,
};
