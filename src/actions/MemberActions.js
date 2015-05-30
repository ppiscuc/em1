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
  onCreate (member) {
    console.log('oncreate');
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
}
export default alt.createActions(MemberActions);
