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
import { ORGANISATION_ROLE_FIELD } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { withRoleViewModel } from '../RoleViewModel/RoleViewModelContextProvider';
import RoleInformation from './Component/RoleInformation';
import { EditHeader } from 'components/EditHeader';
import { PAGE_STATUS } from 'constant';
import { Input } from 'components/Form/Input';
import { Spinner } from 'components';

const EditRole = observer(
  class EditRole extends Component {
    roleDetailViewModel: any = null;
    validator: SimpleReactValidator;
    formPropsData = { [ORGANISATION_ROLE_FIELD.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props: any) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.roleDetailViewModel = props.model?.roleDetailViewModel
        ? props.model?.roleDetailViewModel
        : null;

      this.roleDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match }: any = this.props;
      if (this.isEdit) {
        this.formPropsData[ORGANISATION_ROLE_FIELD.ID] = match.params?.id;
        await this.roleDetailViewModel.initializeData();
      }
    }

    handleValidateForm() {
      if (this.validator.fields['Role Name'] === true) {
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
      this.roleDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t, history }: any = this.props;
      // eslint-disable-next-line no-console
      console.log('rerender Role');

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.roleDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_role')}
              isEdit={this.isEdit}
              redirectUrl={'/roles'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      history.push(`/roles`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.roleDetailViewModel.update()
                          : await this.roleDetailViewModel.create();
                        if (!result?.error) {
                          history.push(`/roles`);
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
                          await this.roleDetailViewModel.update();
                          await this.roleDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.roleDetailViewModel.create();
                          if (!result?.error) {
                            history.push(`/roles/edit/${result?.response}`);
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
                        this.roleDetailViewModel.roleDetailViewModel.formPropsData[
                          ORGANISATION_ROLE_FIELD.ROLE_NAME
                        ],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_role_name'),
                      handleChange: (event: any) => {
                        this.roleDetailViewModel.handleFormPropsData(
                          ORGANISATION_ROLE_FIELD.ROLE_NAME,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor('Role Name');
                      },
                    }}
                  />
                  {this.validator.message(
                    'Role Name',
                    this.roleDetailViewModel.roleDetailViewModel.formPropsData[
                      ORGANISATION_ROLE_FIELD.ROLE_NAME
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <RoleInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={this.roleDetailViewModel.roleDetailViewModel.formPropsData}
                  {...this.props}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.roleDetailViewModel}
                  formPropsData={this.roleDetailViewModel.roleDetailViewModel.formPropsData}
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

export default withTranslation()(withRouter(withRoleViewModel(EditRole)));
