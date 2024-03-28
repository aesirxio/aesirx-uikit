import React from 'react';
import { observer } from 'mobx-react';
import { RoleViewModelContextProvider } from './RoleViewModel/RoleViewModelContextProvider';
import ListRole from './ListRole';

const RolesPage = observer(
  class RolesPage extends React.Component {
    constructor(props: any) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <RoleViewModelContextProvider>
            <ListRole />
          </RoleViewModelContextProvider>
        </div>
      );
    }
  }
);

export { RolesPage };
