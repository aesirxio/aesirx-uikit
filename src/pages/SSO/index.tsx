import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Email from './AesirX/Email';

function SSO() {
  const [modalPassword, setModalPassword] = useState(false);
  interface DeleteModal {
    show: boolean;
    data?: {
      address: string;
      wallet: string;
    };
  }
  return (
    <>
    <div className='bg-white rounded p-4'>
      <h3 className="fs-5 d-flex align-items-center fw-medium mb-12px">
        AesirX Account
        <p
          onClick={() => setModalPassword(true)}
          className="fw-medium fs-7 ms-4 mb-0 text-decoration-underline text-success cursor-pointer"
        >
          Change Password
        </p>
      </h3>
      <Row>
        <Col md={6} lg={6} xxl={4} className="mb-4">
          <Email />
        </Col>
      </Row>
    </div>
     
    </>
  );
}



// const SSOApp = () => {
//   const [modal, setModal] = useState<DeleteModal>({ show: false });
//   const [modalPassword, setModalPassword] = useState(false);

//   // Function to connect a Web3 wallet
//   // const connectWeb3Wallet = async (address: string, walletType: string) => {
//   //   // Implementation of connecting a Web3 wallet
//   //   // ...
//   // };

//   // Function to remove a Web3 wallet
//   // const removeWeb3Wallet = async (address: string, walletType: string) => {
//   //   // Implementation of removing a Web3 wallet
//   //   // ...
//   // };

//   return (
//     <>
//       {/* {modal?.show && (
//         <DeleteModal
//           data={modal?.data}
//           action={removeWeb3Wallet}
//           setShow={setModal}
//           show={modal?.show}
//         />
//       )} */}
//       {/* {modalPassword && <Password setShow={setModalPassword} show={modal} />} */}
//       {/* <h2 className="fs-4 fw-semibold mb-2rem">Single Sign-On Management</h2>
//       <div className="bg-white rounded p-4">
//         <h3 className="fs-5 fw-medium mb-12px">WEB3</h3>
//         <Row>
//           <Col md={6} lg={6} xxl={4} className="mb-4">
//             <Concordium setShow={setModal} connectWallet={connectWeb3Wallet} />
//           </Col>
//           <Col md={6} lg={6} xxl={4} className="mb-4">
//             <MetaMask setShow={setModal} connectWallet={connectWeb3Wallet} />
//           </Col>
//         </Row> */}
//       <h3 className="fs-5 d-flex align-items-center fw-medium mb-12px">
//         AesirX Account
//         <p
//           onClick={() => setModalPassword(true)}
//           className="fw-medium fs-7 ms-4 mb-0 text-decoration-underline text-success cursor-pointer"
//         >
//           Change Password
//         </p>
//       </h3>
//       <Row>
//         <Col md={6} lg={6} xxl={4} className="mb-4">
//           <Email />
//         </Col>
//       </Row>
//       <h3 className="fs-5 fw-medium mb-12px">Social Media</h3>
//       {/* <Row>
//         <Col md={6} lg={6} xxl={4} className="mb-4">
//           <Social typeSocial="google" keySocial={'social_google'} />
//         </Col>
//         <Col md={6} lg={6} xxl={4} className="mb-4">
//           <Social typeSocial="twitter" keySocial={'social_twitter'} />
//         </Col>
//         <Col md={6} lg={6} xxl={4} className="mb-4">
//           <Social typeSocial="facebook" keySocial={'social_facebook'} />
//         </Col>
//       </Row> */}
//       {/* </div> */}
//     </>
//   );
// };

export {SSO} ;
