import React from 'react';
import { observer } from 'mobx-react';
import ListMemberRole from './ListMemberRole';
import { MemberRoleViewModelContextProvider } from './MemberRoleViewModel/MemberRoleViewModelContextProvider';

const MemberRolePage = observer(
  class MemberRolePage extends React.Component {
    constructor(props: any) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <MemberRoleViewModelContextProvider>
            <ListMemberRole />
          </MemberRoleViewModelContextProvider>
        </div>
      );
    }
  }
);

export { MemberRolePage };
