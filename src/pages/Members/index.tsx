import React from 'react';
import { observer } from 'mobx-react';
import { MemberViewModelContextProvider } from './MemberViewModel/MemberViewModelContextProvider';
import { ListMember } from './ListMember';

const MembersPage = observer(
  class MembersPage extends React.Component {
    constructor(props: any) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <MemberViewModelContextProvider>
            <ListMember />
          </MemberViewModelContextProvider>
        </div>
      );
    }
  }
);

export { MembersPage };
