import React from 'react';
import { observer } from 'mobx-react';
import ListPermission from './ListPermission';
import { PermissionViewModelContextProvider } from './PermissionViewModel/PermissionViewModelContextProvider';

const PermissionPage = observer(
  class PermissionPage extends React.Component {
    constructor(props: any) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <PermissionViewModelContextProvider>
            <ListPermission />
          </PermissionViewModelContextProvider>
        </div>
      );
    }
  }
);

export { PermissionPage };
