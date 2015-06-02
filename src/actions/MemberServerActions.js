import alt from '../alt';
import PouchUtils from '../utils/PouchUtils';

class MemberServerActions {
  onMembersUpdated({members}) {
    console.log("onmembersupdated action");
    this.dispatch({members});
  }
}
export default alt.createActions(MemberServerActions);
