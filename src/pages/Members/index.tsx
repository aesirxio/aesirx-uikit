import React from 'react';
import { observer } from 'mobx-react';
import { MemberViewModelContextProvider } from './MemberViewModel/MemberViewModelContextProvider';
import { MemberStore } from './store';
import MemberViewModel from './MemberViewModel/MemberViewModel';
import ListMember from './ListMember';
const memberStore = new MemberStore();
const memberViewModel = new MemberViewModel(memberStore);

const MembersPage = observer(
  class MembersPage extends React.Component {
    constructor(props: any) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <MemberViewModelContextProvider viewModel={memberViewModel}>
            <ListMember />
          </MemberViewModelContextProvider>
        </div>
      );
    }
  }
);

export { MembersPage };
