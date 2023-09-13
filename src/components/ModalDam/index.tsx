import React from 'react';
import { AesirXDam } from 'aesirx-dam-app';

import { ModalComponent } from 'components/Modal';

function ModalDAMComponent({
  show,
  onHide,
  onSelect,
  type = '',
  accept = '*',
  isMutil = false,
}: any) {
  return (
    <ModalComponent
      dialogClassName={'modal-xl modal_digital_assets'}
      show={show}
      onHide={onHide}
      centered
      autoFocus={false}
      body={
        <AesirXDam
          onSelect={onSelect}
          toolbar={false}
          type={type}
          accept={accept}
          isMutil={isMutil}
        />
      }
    />
  );
}

export { ModalDAMComponent };
