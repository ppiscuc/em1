import alt from '../alt';
import PouchUtils from '../utils/PouchUtils';
//do not mount router here

class MemberServerActions {
  onMembersUpdated({members}) {
    console.log("onmembersupdated action");
    this.dispatch({members});
  },
  onSettingsUpdated({settings}) {
    this.dispatch({settings});
  }
}
export default alt.createActions(MemberServerActions);
