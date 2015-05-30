import alt from '../alt';

class MemberActions {
  search(query) {
    this.dispatch({query});
  }
  searchSuccess(members) {
    this.dispatch(members);
  }
  members () {
    this.dispatch({});
  }
  create (member) {
    this.dispatch({member});
  }
  update (member) {
    this.dispatch({member});
  }
  onNewSettings(church_name, church_address) {
    console.log('ACT onNewSettings');
    this.dispatch({church_name, church_address});
  }
}
export default alt.createActions(MemberActions);
