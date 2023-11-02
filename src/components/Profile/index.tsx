import React from 'react';
import { logout, Helper, Storage, AUTHORIZATION_KEY } from 'aesirx-lib';
import { Dropdown } from 'react-bootstrap';
import { Image } from 'components/Image';
import { useTranslation } from 'react-i18next';
import { useAppContext } from 'providers';
import avatar from '../../assets/images/avatar.png';
import sign_out from '../../assets/images/sign_out.svg';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { profileMenu } = useAppContext();

  const { t } = useTranslation();
  const preregistration: any = Storage.getItem('preregistration') ?? '';
  const CustomToggleAvatar = React.forwardRef(({ onClick }: any, ref: any) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="d-flex align-items-center text-decoration-none cursor-pointer"
    >
      <Image
        src={
          preregistration?.objForm?.avatar
            ? preregistration?.objForm?.avatar
            : Helper.isValidUrl(String(Storage.getItem(AUTHORIZATION_KEY.AVATAR)))
            ? Storage.getItem(AUTHORIZATION_KEY.AVATAR)
            : avatar
        }
        alt=""
        className="img-avatar rounded-circle object-fit-cover h-45"
      />
      {/* <div className="text ps-16 pe-2">
        <p className="mb-0 fs-14 fw-bold">
          <>{preregistration?.objForm?.id ?? Storage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME)}</>
        </p>
      </div>
      <i className="icons text-green">
        <FontAwesomeIcon icon={faChevronDown} />
      </i> */}
    </div>
  ));

  return (
    <div className="pe-4 me-2">
      <div className="wrapper_avatar position-relative">
        <Dropdown>
          <Dropdown.Toggle
            as={CustomToggleAvatar}
            id="dropdown-custom-components position-relative"
          ></Dropdown.Toggle>
          <Dropdown.Menu className="shadow border-0 px-16">
            <div className="text px-16 pe-2">
              <p className="mb-0 fs-14 px-3 pb-2 pt-3 fw-bold">
                <>
                  {preregistration?.objForm?.id ??
                    Storage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME)}
                </>
              </p>
            </div>
            {profileMenu && (
              <div className="">
                <ul className="list-unstyled ps-0 mb-0 list_menu_avatar">
                  {profileMenu?.map((value: any, index: any) => {
                    return (
                      <li key={index}>
                        <Dropdown.Item className="text-body d-block rounded-1 text-decoration-none p-0">
                          <Link className="d-block p-16 text-decoration-none" to={value.link}>
                            {t(value.text)}
                          </Link>
                        </Dropdown.Item>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <div
              onClick={logout}
              className="d-flex align-items-center border-gray cursor-pointer py-10px px-3 fw-medium cursor-pointer w-100 text-start d-flex align-items-center fs-7 btn btn-danger rounded-3"
            >
              <Image src={sign_out} alt="" width={24} height={24} />
              <span className="ms-2">{t('txt_sign_out')}</span>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export { Profile };
