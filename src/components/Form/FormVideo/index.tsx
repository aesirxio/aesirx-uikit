/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import { ModalDAMComponent } from 'components/ModalDam';
import React, { useState } from 'react';
import { Button, Col, Ratio, Row } from 'react-bootstrap';

import './index.scss';
import { SVGComponent } from 'components/SVGComponent';
import ComponentVideo from 'components/ComponentVideo';
const FormVideo = ({ field }: any) => {
  const [file, setFile] = useState(field.getValueSelected);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const onSelect = (data: any) => {
    const convertedData = data?.map((item: any) => ({
      id: item.id,
      download_url: item.download_url,
    }));
    convertedData.length && setFile(convertedData);
    field.handleChange(convertedData);
    setShow(false);
    field?.blurred();
  };
  const deleteImage = (e: any) => {
    e.stopPropagation();
    setFile(null);
    field.handleChange(null);
  };
  return (
    <>
      <div className="position-relative">
        {file?.length && file[0] && (
          <Row className="gx-24 mb-16">
            <Col lg={7}>
              <Ratio aspectRatio="16x9">
                <div className="d-flex align-items-center w-100 h-100 border video-wrapper">
                  <div
                    className="delete-icon p-sm rounded-2"
                    onClick={(e) => {
                      deleteImage(e);
                    }}
                  >
                    <SVGComponent url="/assets/images/delete.svg" className={'bg-danger'} />
                  </div>
                  <ComponentVideo src={file[0] && file[0]?.download_url} />
                </div>
              </Ratio>
            </Col>
          </Row>
        )}
        <Button
          variant={`light`}
          className={` px-24 py-10 fw-semibold d-flex align-items-center rounded-1 border`}
          onClick={() => {
            setShow(true);
          }}
        >
          <SVGComponent url="/assets/images/add-media-image.svg" className="bg-black me-1" />
          Add More Video
        </Button>
      </div>
      <ModalDAMComponent
        show={show}
        onHide={handleClose}
        onSelect={onSelect}
        type="video"
        accept={{
          'video/*': ['.mp4', '.mpeg', '.webm'],
        }}
      />
    </>
  );
};

export { FormVideo };
