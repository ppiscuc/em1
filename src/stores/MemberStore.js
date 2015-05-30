import alt from '../alt';
import MemberActions from '../actions/MemberActions';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

class MemberStore {
  constructor () {
    //this.bindAction(MemberActions.create, this.create);
    console.log('calling again the constructor!');
    this.bindActions(MemberActions);

    this.selectedMember = null;
    this.loading = false;
    this.test = 'test';
    this.errors = [];
    this.members = [];
    this.filteredMembers = [];
    this.church_name = '';
    this.church_address = '';
  }
  onSearch() {
    this.setState({
      loading: true
    });
  }
  onSearchSuccess(members){
    this.loading = false;
    this.filteredMembers = members;
  }
  onCreate(member) {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
    member.id = id;
    var curmembers = this.members;
    curmembers.push(member);
    this.setState({
      members: curmembers
    });

  }
  onUpdate(update) {
    //this.members[id] = assign(this.members[id], update);
    this.members.push(update);
  }
  onSelect(member) {
    this.selectedMember = member;
  }
  onNewSettings({church_name, church_address}) {
    console.log('STOR onNewSettings', church_name, church_address);
    this.setState({
      church_name,
      church_address
    });
  }
  changeTest(value) {
    this.setState({
      test: value
    });
  }
  static getMembers() {
    return this.getState().members;
  }

}
export default alt.createStore(MemberStore);
