/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import SimpleReactValidator from 'simple-react-validator';
import { Form } from 'react-bootstrap';

import { renderingGroupFieldHandler } from './Helper';

class FormComponent extends Component<any, any> {
  formPropsData = null;

  isEditMode = false;
  validator: any = null;
  viewModel: any = null;

  constructor(props: any) {
    super(props);

    this.isEditMode = props.editMode === true;
    this.validator = new SimpleReactValidator();
    this.viewModel = this.props.viewModel;
    this.formPropsData = props.formPropsData;

    if (this.isEditMode) {
      this.populatingFormDataHandler(props.populatedFormData);
    }

    this.viewModel.setForm(this);
  }

  populatingFormDataHandler(populatedFormData: any) {
    throw new Error('Method not implemented.');
  }

  isFormValid = () => {
    if (this.validator.allValid()) {
      return true;
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
      return false;
    }
  };

  getFormPropsData = () => this.formPropsData;

  renderingFormHandler = (formSetting: any) => {
    return (
      <Form key={Math.random()} className={this.props.formClassName}>
        {Object.keys(formSetting)
          .map((groupIndex) => {
            return [...Array(formSetting[groupIndex])].map((group) => {
              return renderingGroupFieldHandler(group, this.validator);
            });
          })
          .reduce((arr, el) => {
            return arr.concat(el);
          }, [])}
      </Form>
    );
  };

  render() {
    this.validator.purgeFields();

    let formSetting = this.props.generateFormSetting();

    return this.renderingFormHandler(formSetting);
  }
}

export { FormComponent };
