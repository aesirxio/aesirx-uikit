import axios from 'axios';
import { stringMessage } from '@concordium/react-components';
const createPreregistration = async (data: any, jwt: any) => {
  try {
    return await axios.post(`${process.env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
    });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

const activation = async (web3id: any, code: any) => {
  return await axios.put(
    `${process.env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/activation/${web3id}/${code}`
  );
};

const getNonce = async (accountAddress: any, connection: any, text: string = '') => {
  try {
    const nonce = (
      await axios.get(
        `${process.env.REACT_APP_WEB3_API_ENDPOINT}/account/${accountAddress}/nonce?text=${text}`
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
  return await axios.get(`${process.env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/aesirx`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jwt,
    },
  });
};


const linkAccount = async (web3Id: any, accountAddress: any, signedNonce: any) => {
  await axios.put(
    `${process.env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/id/${web3Id}/account/${accountAddress}/?signature=${signedNonce}&network=${process.env.REACT_PUBLIC_CONCORDIUM_NETWORK}`
  );
};

const linkAesirXAccount = async (web3id: any, jwt: any) => {
  await axios.put(
    `${process.env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/aesirx/${web3id}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
    }
  );
};

const loginAesirXAccount = async (accountAddress: any, signedNonce: any) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_ENDPOINT_URL}/index.php?api=hal&option=member&task=walletLogin&webserviceClient=site&webserviceVersion=1.0.0`,
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

const savePreregistration = async (jwt: any, data: any) => {
  try {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('first_name', data.first_name);
    formData.append('sur_name', data.sur_name);
    formData.append('organization', data.organization);
    formData.append('avatar', data.avatar);

    return await axios.put(`${process.env.REACT_APP_WEB3_API_ENDPOINT}/preregistration`, data, {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: 'Bearer ' + jwt,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const joinTestnet = async (accountAddress: any, signedNonce: any, jwt: any) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/${process.env.REACT_PUBLIC_CONCORDIUM_NETWORK}/add/${accountAddress}?signature=${signedNonce}&network=${process.env.REACT_PUBLIC_CONCORDIUM_NETWORK}`,
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

const walletLogin = async (wallet: any, accountAddress: any, signedNonce: any) => {
  try {
    const data = (
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT_URL}/index.php?api=hal&option=member&task=walletLogin&webserviceClient=site&webserviceVersion=1.0.0`,
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
      `${process.env.REACT_APP_WEB3_API_ENDPOINT}/interests/${process.env.REACT_PUBLIC_CONCORDIUM_NETWORK}/consent?signature=${signature}`,
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

const checkAccountAvailable = async (accountAddress: any) => {
  try {
    return (
      await axios.get(
        `${process.env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/checkwallet/${process.env.REACT_PUBLIC_CONCORDIUM_NETWORK}/${accountAddress}`
      )
    ).data.result;
  } catch (error) {
    return true;
  }
};

const validateWeb3Id = async (id: any) => {
  try {
    return !(
      await axios.get(`${process.env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/checkid/${id}`)
    ).data.result;
  } catch (error) {
    return false;
  }
};

const validateEmail = async (email: any) => {
  try {
    const [validateOnWeb3id, validateOnAesirx] = await Promise.all([
      !(
        await axios.get(
          `${process.env.REACT_APP_WEB3_API_ENDPOINT}/preregistration/checkemail/${email}`
        )
      ).data.result,
      !(
        await axios.post(
          `${process.env.REACT_APP_ENDPOINT_URL}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=checkEmailIsUsed&api=hal`,
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

export {
  createPreregistration,
  activation,
  getNonce,
  getPreregistration,
  linkAccount,
  linkAesirXAccount,
  loginAesirXAccount,
  savePreregistration,
  joinTestnet,
  walletLogin,
  acceptConsent,
  checkAccountAvailable,
  validateWeb3Id,
  validateEmail,
};
