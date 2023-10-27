/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { CSSProperties } from 'react';

import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import customStyles from './customStyles';
import { withTranslation } from 'react-i18next';

class AesirXSelect extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const {
      isBorder,
      plColor,
      async,
      placeholder,
      arrowColor,
      isDisabled,
      size,
      minWidth,
      t,
      isClearable = false,
    }: any = this.props;

    const styles = customStyles(isBorder, plColor, arrowColor, isDisabled, size, minWidth);

    if (async) {
      return (
        <AsyncSelect {...this.props} placeholder={placeholder ?? t('txt_select')} styles={styles} />
      );
    }
    const { ValueContainer, Placeholder, IndicatorSeparator } = components;
    const CustomValueContainer = ({ children, ...props }: any) => {
      return (
        <ValueContainer {...props} className="valueContainerCustom ps-16 pe-14">
          {!props.hasValue && (
            <Placeholder {...props} isFocused={props.isFocused}>
              {props.selectProps.placeholder}
            </Placeholder>
          )}

          {React.Children.map(children, (child) =>
            child && child.type !== Placeholder ? child : null
          )}
        </ValueContainer>
      );
    };

    const groupStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    const groupBadgeStyles: CSSProperties = {
      backgroundColor: '#EBECF0',
      borderRadius: '2em',
      color: '#172B4D',
      display: 'inline-block',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: '1',
      minWidth: 1,
      padding: '0.16666666666667em 0.5em',
      textAlign: 'center',
    };

    const formatGroupLabel = (data: any) => (
      <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
      </div>
    );
    return (
      <Select
        {...this.props}
        components={{
          ValueContainer: CustomValueContainer,
          IndicatorSeparator:
            isClearable && this.props?.defaultValue ? IndicatorSeparator : () => null,
        }}
        isClearable={isClearable}
        placeholder={placeholder ?? t('txt_select')}
        styles={styles}
        formatGroupLabel={formatGroupLabel}
        className="h-100"
      />
    );
  }
}

const AesirXSelectExtended = withTranslation()(AesirXSelect);

export { AesirXSelectExtended as AesirXSelect };
