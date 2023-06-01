/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import ActionsBar from 'components/ActionsBar';
import PublishOptions from 'components/PublishOptions';
import { ORGANISATION_MEMBER_FIELD } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { withMemberViewModel } from '../MemberViewModel/MemberViewModelContextProvider';
import MemberInformation from './Component/MemberInformation';
import EditHeader from 'components/EditHeader';
import { PAGE_STATUS } from 'constant';
import { Input } from 'components/Form/Input';
import { Spinner } from 'components';

const EditMember = observer(
  class EditMember extends Component {
    memberDetailViewModel = null;
    formPropsData = { [ORGANISATION_MEMBER_FIELD.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props: any) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.memberDetailViewModel = this.viewModel
        ? this.viewModel.getMemberDetailViewModel()
        : null;
      this.memberDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[ORGANISATION_MEMBER_FIELD.ID] = this.props.match.params?.id;
        await this.memberDetailViewModel.initializeData();
      }
      await this.memberDetailViewModel.getRoleList();
    }

    handleValidateForm() {
      if (this.validator.fields['Member Name'] === true) {
        this.setState((prevState) => {
          return {
            ...prevState,
            requiredField: Math.random(1, 200),
          };
        });
      }
      this.validator.showMessages();
      this.forceUpdate();
    }

    debouncedChangeHandler = _.debounce((value) => {
      this.memberDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t, history }: any = this.props;
      // eslint-disable-next-line no-console
      console.log('rerender Member');

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.memberDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_member')}
              isEdit={this.isEdit}
              redirectUrl={'/members'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      history.push(`/members`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  // {
                  //   title: t('txt_preview'),
                  //   handle: () => {},
                  //   icon: '/assets/images/preview.svg',
                  // },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.memberDetailViewModel.update()
                          : await this.memberDetailViewModel.create();
                        if (!result?.error) {
                          history.push(`/members`);
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
                          await this.memberDetailViewModel.update();
                          await this.memberDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.memberDetailViewModel.create();
                          if (!result?.error) {
                            history.push(`/members/edit/${result?.response}`);
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
                      value:
                        this.memberDetailViewModel.memberDetailViewModel.formPropsData[
                          ORGANISATION_MEMBER_FIELD.MEMBER_NAME
                        ],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_member_name'),
                      changed: (event: any) => {
                        this.memberDetailViewModel.handleFormPropsData(
                          ORGANISATION_MEMBER_FIELD.MEMBER_NAME,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor('Member Name');
                      },
                    }}
                  />
                  {this.validator.message(
                    'Member Name',
                    this.memberDetailViewModel.memberDetailViewModel.formPropsData[
                      ORGANISATION_MEMBER_FIELD.MEMBER_NAME
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <MemberInformation
                  validator={this.validator}
                  formPropsData={this.memberDetailViewModel.memberDetailViewModel.formPropsData}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.memberDetailViewModel}
                  formPropsData={this.memberDetailViewModel.memberDetailViewModel.formPropsData}
                  isEdit={this.isEdit}
                  isFeatured={false}
                />
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
  }
);

export default withTranslation()(withRouter(withMemberViewModel(EditMember)));
