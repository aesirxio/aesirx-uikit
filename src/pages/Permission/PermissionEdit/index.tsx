/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { ActionsBar } from 'components/ActionsBar';
import { PublishOptions } from 'components/PublishOptions';
import { PERMISSION_FIELD } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import PermissionInformation from './Component/PermissionInformation';
import { EditHeader } from 'components/EditHeader';
import { PAGE_STATUS } from 'constant';
import { Input } from 'components/Form/Input';
import { Spinner } from 'components';
import { withPermissionViewModel } from '../PermissionViewModel/PermissionViewModelContextProvider';

const EditPermission = observer(
  class EditPermission extends Component {
    permissionDetailViewModel: any = null;
    validator: SimpleReactValidator;
    formPropsData = { [PERMISSION_FIELD.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props: any) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.permissionDetailViewModel = props.model?.permissionDetailViewModel
        ? props.model?.permissionDetailViewModel
        : null;

      this.permissionDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match }: any = this.props;
      if (this.isEdit) {
        this.formPropsData[PERMISSION_FIELD.ID] = match.params?.id;
        await this.permissionDetailViewModel.initializeData();
      }
    }

    handleValidateForm() {
      if (this.validator.fields['Permission Name'] === true) {
        this.setState((prevState) => {
          return {
            ...prevState,
            requiredField: Math.random(),
          };
        });
      }
      this.validator.showMessages();
    }

    debouncedChangeHandler = _.debounce((value) => {
      this.permissionDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t, history }: any = this.props;
      // eslint-disable-next-line no-console
      console.log('rerender Permission');

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.permissionDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_permission')}
              isEdit={this.isEdit}
              redirectUrl={'/permissions'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      history.push(`/permissions`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.permissionDetailViewModel.update()
                          : await this.permissionDetailViewModel.create();
                        if (!result?.error) {
                          history.push(`/permissions`);
                        }
                      } else {
                        this.handleValidateForm();
                      }
                    },
                  },
                  {
                    title: t('txt_save'),
                    validator: this.validator,
                    handle: async () => {
                      if (this.validator.allValid()) {
                        if (this.isEdit) {
                          await this.permissionDetailViewModel.update();
                          await this.permissionDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.permissionDetailViewModel.create();
                          if (!result?.error) {
                            history.push(`/permissions/edit/${result?.response}`);
                          }
                        }
                      } else {
                        this.handleValidateForm();
                      }
                    },
                    icon: '/assets/images/save.svg',
                    variant: 'success',
                  },
                ]}
              />
            </div>
          </div>
          <Form>
            <Row className="gx-24 mb-24">
              <Col lg={9}>
                <Form.Group className={`mb-24`}>
                  <Input
                    field={{
                      getValueSelected:
                        this.permissionDetailViewModel.permissionDetailViewModel.formPropsData[
                          PERMISSION_FIELD.ROLE_NAME
                        ],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_permission_name'),
                      handleChange: (event: any) => {
                        this.permissionDetailViewModel.handleFormPropsData(
                          PERMISSION_FIELD.ROLE_NAME,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor('Permission Name');
                      },
                    }}
                  />
                  {this.validator.message(
                    'Permission Name',
                    this.permissionDetailViewModel.permissionDetailViewModel.formPropsData[
                      PERMISSION_FIELD.ROLE_NAME
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <PermissionInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.permissionDetailViewModel.permissionDetailViewModel.formPropsData
                  }
                  {...this.props}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.permissionDetailViewModel}
                  formPropsData={
                    this.permissionDetailViewModel.permissionDetailViewModel.formPropsData
                  }
                  isEdit={this.isEdit}
                  isFeatured={false}
                  isPublishedSimple={true}
                />
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
  }
);

export default withTranslation()(withRouter(withPermissionViewModel(EditPermission)));
