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
        borderColor: isBorder ? 'var(--input-border-color)' : 'transparent',
        '&:hover': {
          // borderColor: isBorder ? '#8bdcbc' : 'transparent',
          // borderRight: '1px solid var(input-border-color)',
        },
        // borderRight: '1px solid var(input-border-color)',
        backgroundColor: isDisabled ? 'var(--input-border-color)' : 'var(--input-backgound-color)',
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
        borderLeft: '1px solid var(input-border-color)',
        borderRight: '1px solid var(input-border-color)',
        boxShadow: '0 3px 5px rgb(0 0 0 / 5%)',
        borderTop: '1px solid var(input-border-color)',
        borderBottom: '1px solid var(input-border-color)',
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
        color: state.isSelected ? 'var(--dropdown-item-hover-color)' : 'var(--dropdown-item-color)',
        backgroundColor: state.isSelected ? 'var(--dropdown-item-hover-bg)' : 'var(--dropdown-bg)',
        '&:hover': {
          color: 'var(--dropdown-item-hover-color)',
          backgroundColor: 'var(--dropdown-item-hover-bg)',
        },
      };
    },
    indicatorSeparator: () => ({ display: 'none' }),

    dropdownIndicator: (base: any) => ({
      ...base,
      color: arrowColor ? arrowColor : 'var(--bs-success)',
      '&:hover': {
        color: 'var(--bs-success)',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'var(--bs-body-color)',
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
        backgroundColor: 'var(--view-active-bg)',
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: 'var(--bs-body-color)',
    }),
  };
};

export default customStyles;
