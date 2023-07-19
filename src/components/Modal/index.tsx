/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { withTranslation } from 'react-i18next';

import './index.scss';
import { Modal } from 'react-bootstrap';

const ModalComponent = ({
  header,
  footer,
  body,
  show,
  onHide,
  dialogClassName,
  onShow,
  bodyClassName,
  contentClassName,
  modalClassname,
  closeButton,
}: any) => {
  return (
    <Modal
        show={show}
        onShow={onShow}
        onHide={onHide}
        centered
        dialogClassName={dialogClassName ?? ''}
        contentClassName={contentClassName ?? ''}
        className={`aesirxui ${modalClassname}`}
      >
        <Modal.Header className="px-4 border-bottom-0 text-blue-0">
          {header && <Modal.Title>{header}</Modal.Title>}
          {closeButton && <span onClick={onHide} className="close"></span>}
        </Modal.Header>
        <Modal.Body className={`${bodyClassName ?? 'px-4 pt-2 pb-0'} `}>{body}</Modal.Body>
        {footer && <Modal.Footer className="px-4">{footer}</Modal.Footer>}
      </Modal>
  );
};

const ModalComponentExtended = withTranslation()(ModalComponent);

export { ModalComponentExtended as ModalComponent };
