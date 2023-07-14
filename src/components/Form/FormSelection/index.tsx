/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { CreatableComponent } from 'components/Select/Creatable';
import { AesirXSelect } from 'components/Select';

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
    return (
      <>
        {this.props.field.creatable ? (
          <CreatableComponent
            defaultValue={this.props.field.getValueSelected}
            isBorder={true}
            arrowColor={this.props.field.arrowColor}
            placeholder={this.props.field.placeholder}
            className="fs-14"
            onChange={this.props.field.handleChange}
          />
        ) : (
          <>
            <AesirXSelect
              value={this.state.field ?? null}
              options={this.props.field?.getDataSelectOptions}
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
        )}
      </>
    );
  }
}

export { FormSelection };
