import React from 'react';
import { AesirXDam } from 'aesirx-dam-app';

import './index.scss';
import { ModalComponent } from 'components/Modal';

function ModalDAMComponent({ show, onHide, onSelect, type = '' }: any) {
  return (
    <ModalComponent
      dialogClassName={'modal-xl modal_digital_assets'}
      show={show}
      onHide={onHide}
      centered
      autoFocus={false}
      body={
        <div className="modal-class">
          <AesirXDam
            onSelect={onSelect}
            toolbar={false}
            type={type}
            accept={{
              'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
            }}
          />
        </div>
      }
    />
  );
}

export { ModalDAMComponent };
