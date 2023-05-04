import React from 'react';
import { AesirXDam } from 'aesirx-dam-app';

import './index.scss';
import { ModalComponent } from 'components/Modal';

function ModalDAMComponent({ show, onHide, onSelect }: any) {
  return (
    <ModalComponent
      dialogClassName={'modal-xl modal_digital_assets'}
      show={show}
      onHide={onHide}
      centered
      autoFocus={false}
      body={
        <div className="modal-class">
          <AesirXDam onSelect={onSelect} />
        </div>
      }
    />
  );
}

export default ModalDAMComponent;
