import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { UtilsViewModelContextProvider } from 'store/UtilsStore/UtilsViewModelContextProvider';
import PublishOptionsDetail from './PublishOptions';
import UtilsListViewModel from 'store/UtilsStore/UtilsListViewModel';
import UtilsStore from 'store/UtilsStore/UtilsStore';
const utilsStore = new UtilsStore();
const utilsListViewModel = new UtilsListViewModel(utilsStore);
const PublishOptions = observer(
  class PublishOptions extends Component {
    constructor(props: any) {
      super(props);
    }
    render() {
      return (
        <UtilsViewModelContextProvider viewModel={utilsListViewModel}>
          <PublishOptionsDetail {...this.props} />
        </UtilsViewModelContextProvider>
      );
    }
  }
);
export default withTranslation()(PublishOptions);
