import { ORGANISATION_ROLE_FIELD } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { RoleViewModelContext } from 'pages/Roles/RoleViewModel/RoleViewModelContextProvider';
import { FORM_FIELD_TYPE } from 'constant';
import { renderingGroupFieldHandler } from 'components';

const RoleInformation = observer(
  class RoleInformation extends Component {
    static contextType = RoleViewModelContext;
    declare context: React.ContextType<typeof RoleViewModelContext>;
    viewModel: any = null;

    constructor(props: any) {
      super(props);
    }

    render() {
      this.viewModel = this.context.model.roleDetailViewModel;
      const { t, validator }: any = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_description'),
              key: ORGANISATION_ROLE_FIELD.DESCRIPTION,
              type: FORM_FIELD_TYPE.EDITOR,
              getValueSelected:
                this.viewModel.roleDetailViewModel.formPropsData[
                  ORGANISATION_ROLE_FIELD.DESCRIPTION
                ] ?? null,
              handleChange: (data: any) => {
                this.viewModel.handleFormPropsData(ORGANISATION_ROLE_FIELD.DESCRIPTION, data);
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
export default withTranslation()(RoleInformation);
