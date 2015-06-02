import alt from '../alt';
import PouchUtils from '../utils/PouchUtils';

class MemberActions {
  onSearch(query) {
    this.dispatch(query);
  }
  onSearchSuccess({members}) {
    this.dispatch({members});
  }
  members () {
    this.dispatch({});
  }
  fetchAllMembers () {
    this.dispatch();
    PouchUtils.fetchAllMembers();
  }
  onCreate (member) {
    member._id = new Date().toISOString();
    PouchUtils.addMember(member);
    this.dispatch(member);
  }
  update (member) {
    this.dispatch({member});
  }
  onNewSettings(church_name, church_address) {
    console.log('ACT onNewSettings');
    this.dispatch({church_name, church_address});
  }
  changeTest(value) {
    this.dispatch(value);
  }
  search(query) {
    this.dispatch(query);
  }
  //server actions
}
export default alt.createActions(MemberActions);
