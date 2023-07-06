/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { AesirXSelect } from '../../Select';

class FormSelection extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { field: props.field.getValueSelected };
  }

  handleChange = (data: any) => {
    this.props.field.handleChange(data);
    this.setState({ field: data });
  };
  componentDidUpdate = (prevProps: any) => {
    if (prevProps.field.getValueSelected !== this.props.field.getValueSelected) {
      this.setState({ field: this.props.field.getValueSelected });
    }
  };
  render() {
    const dataSelected =
      this.props.field?.isMulti && this.state.field?.length
        ? this.props.field?.getDataSelectOptions?.filter((item: any) => {
            return !this.state.field?.find(
              (o: any) => item?.value?.toString() === o?.value?.toString()
            );
          })
        : this.props.field?.getDataSelectOptions;
    return (
      <>
        <AesirXSelect
          value={this.state.field ?? null}
          options={dataSelected}
          className="fs-14"
          isBorder={true}
          //onFocus={this.props.field.changed}
          onBlur={this.props.field?.blurred}
          isMulti={this.props.field?.isMulti}
          onChange={this.handleChange}
          arrowColor={this.props.field?.arrowColor}
          placeholder={this.props.field?.placeholder}
          isDisabled={this.props.field?.isDisabled}
          size="large"
          isClearable={this.props.field?.isClearable}
        />
      </>
    );
  }
}

export { FormSelection };
