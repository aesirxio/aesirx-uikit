import { ORGANISATION_MEMBER_FIELD } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { MemberViewModelContext } from 'pages/Members/MemberViewModel/MemberViewModelContextProvider';
import { FORM_FIELD_TYPE } from 'constant';
import { renderingGroupFieldHandler } from 'components';

const MemberInformation = observer(
  class MemberInformation extends Component {
    static contextType = MemberViewModelContext;
    declare context: React.ContextType<typeof MemberViewModelContext>;
    viewModel: any = null;

    constructor(props: any) {
      super(props);
    }

    render() {
      this.viewModel = this.context.model.memberDetailViewModel;
      const { t, validator, isEdit }: any = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_password'),
              key: ORGANISATION_MEMBER_FIELD.PASSWORD,
              type: FORM_FIELD_TYPE.INPUT,
              typeFormat: FORM_FIELD_TYPE.PASSWORD,
              autoComplete: false,
              getValueSelected:
                this.viewModel.memberDetailViewModel.formPropsData[
                  ORGANISATION_MEMBER_FIELD.PASSWORD
                ],
              placeholder: t('txt_enter_password'),
              ...(!isEdit && {
                required: true,
                validation: 'required',
              }),
              handleChange: (data: any) => {
                this.viewModel.handleFormPropsData(
                  ORGANISATION_MEMBER_FIELD.PASSWORD,
                  data.target.value
                );
              },
              blurred: () => {
                validator.showMessageFor(t('txt_password'));
                this.forceUpdate();
              },
              className: 'col-lg-12',
            },
            {
              label: t('txt_email'),
              key: ORGANISATION_MEMBER_FIELD.MEMBER_EMAIL,
              type: FORM_FIELD_TYPE.INPUT,
              autoComplete: false,
              required: true,
              validation: 'required',
              getValueSelected:
                this.viewModel.memberDetailViewModel.formPropsData[
                  ORGANISATION_MEMBER_FIELD.MEMBER_EMAIL
                ],
              placeholder: t('txt_enter_member_email'),
              handleChange: (data: any) => {
                this.viewModel.handleFormPropsData(
                  ORGANISATION_MEMBER_FIELD.MEMBER_EMAIL,
                  data.target.value
                );
              },
              blurred: () => {
                validator.showMessageFor(t('txt_email'));
                this.forceUpdate();
              },
              className: 'col-lg-12',
            },
            {
              label: t('txt_role'),
              key: ORGANISATION_MEMBER_FIELD.ROLE_ID,
              required: true,
              validation: 'required',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.memberDetailViewModel.formPropsData[
                ORGANISATION_MEMBER_FIELD.ROLE_ID
              ]
                ? {
                    label: this.viewModel?.roleList?.listItems?.find(
                      (x: any) =>
                        x.id.toString() ===
                        this.viewModel.memberDetailViewModel.formPropsData[
                          ORGANISATION_MEMBER_FIELD.ROLE_ID
                        ].toString()
                    )?.role_name,
                    value:
                      this.viewModel.memberDetailViewModel.formPropsData[
                        ORGANISATION_MEMBER_FIELD.ROLE_ID
                      ],
                  }
                : null,
              getDataSelectOptions: this.viewModel?.roleList?.listItems?.length
                ? this.viewModel?.roleList?.listItems?.map((item: any) => {
                    return {
                      label: item.role_name,
                      value: item.id,
                    };
                  })
                : null,
              handleChange: (data: any) => {
                this.viewModel.handleFormPropsData(ORGANISATION_MEMBER_FIELD.ROLE_ID, data.value);
              },
              placeholder: t('txt_select_role'),
              className: 'col-lg-12',
            },
            {
              label: t('txt_metamask_wallet'),
              key: [ORGANISATION_MEMBER_FIELD.CUSTOM_FIELDS][
                ORGANISATION_MEMBER_FIELD.WALLET_METAMASK
              ],
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.memberDetailViewModel.formPropsData[
                  ORGANISATION_MEMBER_FIELD.CUSTOM_FIELDS
                ][ORGANISATION_MEMBER_FIELD.WALLET_METAMASK],
              placeholder: t('txt_enter_metamask_address'),
              handleChange: (data: any) => {
                this.viewModel.handleFormPropsData(ORGANISATION_MEMBER_FIELD.CUSTOM_FIELDS, {
                  [ORGANISATION_MEMBER_FIELD.WALLET_METAMASK]: data.target.value,
                });
              },
              className: 'col-lg-12',
            },
            {
              label: t('txt_concordium_wallet'),
              key: [ORGANISATION_MEMBER_FIELD.CUSTOM_FIELDS][
                ORGANISATION_MEMBER_FIELD.WALLET_CONCORDIUM
              ],
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.memberDetailViewModel.formPropsData[
                  ORGANISATION_MEMBER_FIELD.CUSTOM_FIELDS
                ][ORGANISATION_MEMBER_FIELD.WALLET_CONCORDIUM],
              placeholder: t('txt_enter_concordium_address'),
              handleChange: (data: any) => {
                this.viewModel.handleFormPropsData(ORGANISATION_MEMBER_FIELD.CUSTOM_FIELDS, {
                  [ORGANISATION_MEMBER_FIELD.WALLET_CONCORDIUM]: data.target.value,
                });
              },
              className: 'col-lg-12',
            },
          ],
        },
      ];
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          {Object.keys(generateFormSetting)
            .map((groupIndex: any) => {
              return [...Array(generateFormSetting[groupIndex])].map((group) => {
                return renderingGroupFieldHandler(group, validator);
              });
            })
            .reduce((arr, el) => {
              return arr.concat(el);
            }, [])}
        </div>
      );
    }
  }
);
export default withTranslation()(MemberInformation);
