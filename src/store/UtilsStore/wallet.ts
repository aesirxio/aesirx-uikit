import axios from 'axios';
const getMember = async (accessToken: string) => {
  try {
    const member = await axios.get(
      `${process.env.REACT_APP_ENDPOINT_URL}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=persona&api=hal&task=getTokenByUser`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );

    if (member?.data?.result?.member_id) {
      const data = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_URL}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&api=hal&id=${member?.data?.result?.member_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );
      return data?.data;
    }
  } catch (error) {
    console.log('getMember', error);
    throw error;
  }
};

const connectWallet = async (
  address: string,
  walletType: string,
  accessToken: string,
  userName: string
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT_URL}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=setWallet&api=hal`,
      {
        wallet: walletType,
        publicAddress: address,
        username: userName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );
    return response?.data;
  } catch (error: any) {
    console.log('connectWalletError', error);
    throw error;
  }
};

const removeWallet = async (
  address: string,
  walletType: string,
  accessToken: string,
  userName: string
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT_URL}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=deleteWallet&api=hal`,
      {
        wallet: walletType,
        publicAddress: address,
        username: userName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );
    return response?.data;
  } catch (error: any) {
    console.log('removeWalletError', error);
    throw error;
  }
};

const activeWallet = async (wallet: any, username: any) => {
  try {
    return await axios.post(`/api/activewallet`, { wallet, username });
  } catch (error: any) {
    console.log('activeWallet', error);
    throw error;
  }
};

const forgotPassword = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT_URL}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=processResetRequest&api=hal`,
      { data: data },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT_URL}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=processResetComplete&api=hal`,
      { data: data },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};

export { getMember, connectWallet, activeWallet, removeWallet, forgotPassword, resetPassword };
