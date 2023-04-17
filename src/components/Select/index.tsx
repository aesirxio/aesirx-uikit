/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import customStyles from './customStyles';

class AesirXSelect extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}
  render() {
    let { isBorder, plColor, async, placeholder, arrowColor, isDisabled }: any = this.props;

    let styles = customStyles(isBorder, plColor, arrowColor, isDisabled);

    if (async) {
      return (
        <AsyncSelect {...this.props} placeholder={placeholder ?? 'txt_select'} styles={styles} />
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
        placeholder={placeholder ?? 'txt_select...'}
        styles={styles}
      />
    );
  }
}

export { AesirXSelect };
