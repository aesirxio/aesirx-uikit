import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'components/Image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalDAMComponent } from 'components/ModalDam';

const FormDAMImage = ({ current, onChoose }: any) => {
  const { t } = useTranslation();
  const [image, setImage] = useState(current ?? '');

  const [show, setShow] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const onSelect = (data: any) => {
    const imgUrl = data[0]?.download_url;

    if (imgUrl.split(/[#?]/)[0].split('.').pop().trim() !== 'mp4') {
      setImage(imgUrl);
      onChoose(imgUrl);
    }

    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div
        className="position-relative d-inline-block cursor-pointer rounded-circle h-196 w-196 bg-gray-dark-70 mb-4"
        onClick={() => setShow(true)}
      >
        <ModalDAMComponent
          show={show}
          onHide={handleClose}
          onSelect={onSelect}
          type="image"
          accept={{
            'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
          }}
        />

        {image != '' ? (
          <Image
            className={`rounded-circle h-196 w-196 object-fit-cover mb-1 h-196 transition ${
              isHovered ? 'opacity-50' : 'opacity-100'
            }`}
            src={image}
            style={{ width: 196 }}
          />
        ) : (
          <div
            style={{ height: 196, width: 196 }}
            className="position-relative d-inline-flex align-items-center justify-content-center text-uppercase cursor-pointer rounded-circle bg-gray opacity-50"
          >
            <span className="text-white" style={{ fontSize: '9rem' }}></span>
          </div>
        )}
        <div
          className={`position-absolute w-100 h-100 d-flex align-items-center top-0 start-0 align-content-center text-white text-center transition ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onMouseOver={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          <div className="w-100 px-1">
            <FontAwesomeIcon icon={faCloudUploadAlt} className={`fs-3 mb-1`} />
            <div>{t('txt_click_to_change_image')}</div>
          </div>
        </div>
      </div>
      <div className="my-8px fs-14 text-gray-dark opacity-50">{t('txt_max_file_size')}</div>
    </>
  );
};

export { FormDAMImage };
