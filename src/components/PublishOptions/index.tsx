import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { UtilsViewModelContextProvider } from 'store/UtilsStore/UtilsViewModelContextProvider';
import PublishOptionsDetail from './PublishOptions';
const PublishOptions = observer(
  class PublishOptions extends Component {
    constructor(props: any) {
      super(props);
    }
    render() {
      return (
        <UtilsViewModelContextProvider>
          <PublishOptionsDetail {...this.props} />
        </UtilsViewModelContextProvider>
      );
    }
  }
);
const A = withTranslation()(PublishOptions);

export { A as PublishOptions };
