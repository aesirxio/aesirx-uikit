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
import { MEMBER_ROLE_FIELD } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { withMemberRoleViewModel } from '../MemberRoleViewModel/MemberRoleViewModelContextProvider';
import MemberRoleInformation from './Component/MemberRoleInformation';
import { EditHeader } from 'components/EditHeader';
import { PAGE_STATUS } from 'constant';
import { Input } from 'components/Form/Input';
import { Spinner } from 'components';

const EditMemberRole = observer(
  class EditMemberRole extends Component {
    memberRoleDetailViewModel: any = null;
    validator: SimpleReactValidator;
    formPropsData = { [MEMBER_ROLE_FIELD.CUSTOM_FIELDS]: {}, [MEMBER_ROLE_FIELD.STATE]: 1 };
    isEdit = false;
    constructor(props: any) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.memberRoleDetailViewModel = props.model?.memberRoleDetailViewModel
        ? props.model?.memberRoleDetailViewModel
        : null;

      this.memberRoleDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match }: any = this.props;
      if (this.isEdit) {
        this.formPropsData[MEMBER_ROLE_FIELD.ID] = match.params?.id;
        await this.memberRoleDetailViewModel.initializeData();
      }
    }

    handleValidateForm() {
      if (this.validator.fields['MemberRole Name'] === true) {
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
      this.memberRoleDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t, history }: any = this.props;
      // eslint-disable-next-line no-console
      console.log('rerender MemberRole');

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.memberRoleDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_member_role')}
              isEdit={this.isEdit}
              redirectUrl={'/member-role'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      history.push(`/member-role`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.memberRoleDetailViewModel.update()
                          : await this.memberRoleDetailViewModel.create();
                        if (!result?.error) {
                          history.push(`/member-role`);
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
                          await this.memberRoleDetailViewModel.update();
                          await this.memberRoleDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.memberRoleDetailViewModel.create();
                          if (!result?.error) {
                            history.push(`/member-role/edit/${result?.response}`);
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
                        this.memberRoleDetailViewModel.memberRoleDetailViewModel.formPropsData[
                          MEMBER_ROLE_FIELD.NAME
                        ],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_member_role_name'),
                      handleChange: (event: any) => {
                        this.memberRoleDetailViewModel.handleFormPropsData(
                          MEMBER_ROLE_FIELD.NAME,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor('MemberRole Name');
                      },
                    }}
                  />
                  {this.validator.message(
                    'MemberRole Name',
                    this.memberRoleDetailViewModel.memberRoleDetailViewModel.formPropsData[
                      MEMBER_ROLE_FIELD.NAME
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <MemberRoleInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.memberRoleDetailViewModel.memberRoleDetailViewModel.formPropsData
                  }
                  {...this.props}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.memberRoleDetailViewModel}
                  formPropsData={
                    this.memberRoleDetailViewModel.memberRoleDetailViewModel.formPropsData
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

export default withTranslation()(withRouter(withMemberRoleViewModel(EditMemberRole)));
