/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { AesirXSelect } from '../../Select';

import { components } from 'react-select';

class FormSelectDropdown extends Component<any, any> {
  field: any;
  constructor(props: any) {
    super(props);

    this.field = this.props.field;
  }

  render() {
    return (
      <AesirXSelect
        defaultValue={this.field.value}
        onChange={this.field.changed}
        options={this.field.option}
        isBorder={true}
        plColor="rgba(8, 18, 64, 0.8)"
        isMulti={this.field.isMulti ?? false}
        components={{
          Option: this.field.optionComponent ? this.field.optionComponent : components.Option,
          Placeholder: this.field.placeholderComponent
            ? this.field.placeholderComponent
            : components.Placeholder,
        }}
        async={this.field.async ?? false}
        loadOptions={this.field.loadOptions ?? null}
        cacheOptions
        placeholder={this.field.placeholder}
      />
    );
  }
}

export { FormSelectDropdown };
