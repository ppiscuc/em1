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
}
export default alt.createActions(MemberActions);
