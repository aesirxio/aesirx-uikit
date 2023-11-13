/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const customStyles = (
  isBorder: any,
  plColor: any,
  arrowColor: any,
  isDisabled: any,
  size: any,
  minWidth: any,
  isLanguageSelect?: any
) => {
  return {
    control: (provided: any) => {
      return {
        ...provided,
        minHeight: size === 'large' ? 46 : size ? size : 32,
        height: '100%',
        boxShadow: 'none',
        borderRadius: '5px',
        borderColor: isBorder ? 'var(--aesirxui-border-color)' : 'transparent',
        '&:hover': {
          // borderColor: isBorder ? '#8bdcbc' : 'transparent',
          // borderRight: '1px solid var(--aesirxui-border-color)',
        },
        // borderRight: '1px solid var(--aesirxui-border-color)',
        backgroundColor: isDisabled ? 'var(--aesirxui-input-disabled-bg)' : 'var(--aesirxui-white)',
        cursor: 'pointer',
        width: 'auto',
        minWidth: minWidth,
      };
    },

    menu: (styles: any) => {
      return {
        ...styles,
        top: 'calc(100% - 5px)',
        margin: 0,
        border: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderLeft: '1px solid var(--aesirxui-gray-dark)',
        borderRight: '1px solid var(--aesirxui-gray-dark)',
        boxShadow: '0 3px 5px rgb(0 0 0 / 5%)',
        borderTop: '1px solid var(--aesirxui-gray-dark)',
        borderBottom: '1px solid var(--aesirxui-gray-dark)',
        zIndex: 10,
      };
    },

    menuList: (styles: any) => {
      return {
        ...styles,
        paddingTop: 0,
        paddingBottom: 0,
        ...(isLanguageSelect ? { paddingLeft: 16, paddingRight: 16 } : {}),
      };
    },
    option: (provided: any, state: any) => {
      return {
        ...provided,
        ...(isLanguageSelect
          ? {
              borderBottom: '1px solid var(--aesirxui-gray-dark)',
              color: state.isSelected ? 'var(--aesirxui-success)' : 'var(--aesirxui-body-color)',
              backgroundColor: 'var(--aesirxui-white)',
              '&:hover': {
                color: 'var(--aesirxui-success)',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              },
              paddingLeft: 0,
              paddingRight: 0,
            }
          : {
              color: state.isSelected
                ? 'var(--aesirxui-menu-lang-color)'
                : 'var(--aesirxui-body-color)',
              backgroundColor: state.isSelected
                ? 'var(--aesirxui-menu-lang-hover-bg)'
                : 'var(--aesirxui-white)',
              '&:hover': {
                color: 'var(--aesirxui-menu-lang-color)',
                backgroundColor: 'var(--aesirxui-menu-lang-hover-bg)',
              },
            }),
      };
    },

    dropdownIndicator: (base: any) => ({
      ...base,
      color: arrowColor ? arrowColor : 'var(--aesirxui-success)',
      '&:hover': {
        color: 'var(--aesirxui-success)',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'var(--aesirxui-body-color)',
    }),
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: plColor ? plColor : 'var(--aesirxui-input-placeholder-color)',
      };
    },
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: 'var(--aesirxui-menu-lang-hover-bg)',
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: 'var(--aesirxui-body-color)',
    }),
  };
};

export default customStyles;
