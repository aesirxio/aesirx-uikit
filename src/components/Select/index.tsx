/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import customStyles from './customStyles';
import { withTranslation } from 'react-i18next';

class AesirXSelect extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { isBorder, plColor, async, placeholder, arrowColor, isDisabled, t }: any = this.props;

    const styles = customStyles(isBorder, plColor, arrowColor, isDisabled);

    if (async) {
      return (
        <AsyncSelect {...this.props} placeholder={placeholder ?? t('txt_select')} styles={styles} />
      );
    }
    const { ValueContainer, Placeholder } = components;
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

    return (
      <Select
        {...this.props}
        components={{
          ValueContainer: CustomValueContainer,
        }}
        placeholder={placeholder ?? t('txt_select')}
        styles={styles}
      />
    );
  }
}

const AesirXSelectExtended = withTranslation()(AesirXSelect);

export { AesirXSelectExtended as AesirXSelect };
