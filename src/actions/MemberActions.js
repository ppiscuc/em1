import alt from '../alt';
import PouchUtils from '../utils/PouchUtils';
//do not mount router here

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
    this.dispatch(member);
    PouchUtils.addMember(member);
  }
  update (member) {
    this.dispatch({member});
  }
  onNewSettings({settings}) {
    console.log('ACT onNewSettings');
    this.dispatch({settings});
    PouchUtils.saveSettings(settings);
  }
  changeTest(value) {
    this.dispatch(value);
  }
  search(query) {
    this.dispatch(query);
  }
}
export default alt.createActions(MemberActions);
