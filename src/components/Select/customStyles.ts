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
  minWidth: any
) => {
  return {
    control: (provided: any) => {
      return {
        ...provided,
        minHeight: size === 'large' ? 46 : 32,
        height: '100%',
        boxShadow: 'none',
        borderRadius: '5px',
        borderColor: isBorder ? 'var(--aesirxui-border-color)' : 'transparent',
        '&:hover': {
          // borderColor: isBorder ? '#8bdcbc' : 'transparent',
          // borderRight: '1px solid var(--aesirxui-border-color)',
        },
        // borderRight: '1px solid var(--aesirxui-border-color)',
        backgroundColor: isDisabled ? 'var(--aesirxui-white)' : 'var(--aesirxui-white)',
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
        borderLeft: '1px solid var(--aesirxui-border-color)',
        borderRight: '1px solid var(--aesirxui-border-color)',
        boxShadow: '0 3px 5px rgb(0 0 0 / 5%)',
        borderTop: '1px solid var(--aesirxui-border-color)',
        borderBottom: '1px solid var(--aesirxui-border-color)',
        zIndex: 10,
      };
    },

    menuList: (styles: any) => {
      return {
        ...styles,
        paddingTop: 0,
        paddingBottom: 0,
      };
    },
    option: (provided: any, state: any) => {
      return {
        ...provided,
        color: state.isSelected ? 'var(--aesirxui-menu-lang-color)' : 'var(--aesirxui-body-color)',
        backgroundColor: state.isSelected
          ? 'var(--aesirxui-menu-lang-hover-bg)'
          : 'var(--aesirxui-white)',
        '&:hover': {
          color: 'var(--aesirxui-menu-lang-color)',
          backgroundColor: 'var(--aesirxui-menu-lang-hover-bg)',
        },
      };
    },

    dropdownIndicator: (base: any) => ({
      ...base,
      color: arrowColor ? arrowColor : 'var(--bs-success)',
      '&:hover': {
        color: 'var(--bs-success)',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'var(--aesirxui-body-color)',
    }),
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: plColor ? plColor : 'var(--input-placeholder-color)',
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
