import { MEMBER_ROLE_FIELD } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { FORM_FIELD_TYPE } from 'constant';
import { renderingGroupFieldHandler } from 'components';
import { RoleStore } from 'pages/Roles/store';
import RoleViewModel from 'pages/Roles/RoleViewModel/RoleViewModel';
import { MemberRoleViewModelContext } from 'pages/MemberRole/MemberRoleViewModel/MemberRoleViewModelContextProvider';
import { MemberStore } from 'pages/Members/store';
import MemberViewModel from 'pages/Members/MemberViewModel/MemberViewModel';

const roleStore = new RoleStore();
const roleViewModel = new RoleViewModel(roleStore);
const memberStore = new MemberStore();
const memberViewModel = new MemberViewModel(memberStore);

const MemberRoleInformation = observer(
  class MemberRoleInformation extends Component {
    static contextType = MemberRoleViewModelContext;
    declare context: React.ContextType<typeof MemberRoleViewModelContext>;
    viewModel: any = null;
    roleListViewModel: any;
    memberListViewModel: any;

    constructor(props: any) {
      super(props);
      this.roleListViewModel = roleViewModel.roleListViewModel;
      this.memberListViewModel = memberViewModel.memberListViewModel;
    }
    componentDidMount() {
      const fetchData = async () => {
        await this.roleListViewModel.initializeAllData();
        await this.memberListViewModel.initializeAllData();
      };
      fetchData();
    }
    render() {
      this.viewModel = this.context.model.memberRoleDetailViewModel;
      const { t, validator }: any = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_roles'),
              key: MEMBER_ROLE_FIELD.ROLE_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.memberRoleDetailViewModel.formPropsData[
                MEMBER_ROLE_FIELD.ROLE_ID
              ]
                ? {
                    label:
                      this.roleListViewModel?.successResponse?.listRolesWithoutPagination?.find(
                        (x: any) =>
                          x?.value.toString() ===
                          this.viewModel.memberRoleDetailViewModel.formPropsData[
                            MEMBER_ROLE_FIELD.ROLE_ID
                          ]?.toString()
                      )?.label,
                    value:
                      this.viewModel.memberRoleDetailViewModel.formPropsData[
                        MEMBER_ROLE_FIELD.ROLE_ID
                      ],
                  }
                : null,
              getDataSelectOptions: this.roleListViewModel?.successResponse
                ?.listRolesWithoutPagination?.length
                ? this.roleListViewModel?.successResponse?.listRolesWithoutPagination?.map(
                    (item: any) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                        type: item?.type,
                      };
                    }
                  )
                : [],
              handleChange: (data: any) => {
                this.viewModel.handleFormPropsData(MEMBER_ROLE_FIELD.ROLE_ID, data?.value ?? 0);
                if (data?.type === 'number') {
                  this.setState({ isNumber: true });
                  this.viewModel.handleFormPropsData(MEMBER_ROLE_FIELD.VALUE, '');
                } else {
                  this.setState({ isNumber: false });
                }
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_roles'),
              className: 'col-lg-12',
            },
            {
              label: t('txt_members'),
              key: MEMBER_ROLE_FIELD.MEMBER_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.memberRoleDetailViewModel.formPropsData[
                MEMBER_ROLE_FIELD.MEMBER_ID
              ]
                ? {
                    label:
                      this.memberListViewModel?.successResponse?.listMembersWithoutPagination?.find(
                        (x: any) =>
                          x?.value.toString() ===
                          this.viewModel.memberRoleDetailViewModel.formPropsData[
                            MEMBER_ROLE_FIELD.MEMBER_ID
                          ]?.toString()
                      )?.label,
                    value:
                      this.viewModel.memberRoleDetailViewModel.formPropsData[
                        MEMBER_ROLE_FIELD.MEMBER_ID
                      ],
                  }
                : null,
              getDataSelectOptions: this.memberListViewModel?.successResponse
                ?.listMembersWithoutPagination?.length
                ? this.memberListViewModel?.successResponse?.listMembersWithoutPagination?.map(
                    (item: any) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                        type: item?.type,
                      };
                    }
                  )
                : [],
              handleChange: (data: any) => {
                this.viewModel.handleFormPropsData(MEMBER_ROLE_FIELD.MEMBER_ID, data?.value ?? 0);
                if (data?.type === 'number') {
                  this.setState({ isNumber: true });
                  this.viewModel.handleFormPropsData(MEMBER_ROLE_FIELD.VALUE, '');
                } else {
                  this.setState({ isNumber: false });
                }
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_members'),
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
export default withTranslation()(MemberRoleInformation);
