import alt from '../alt';
import MemberActions from '../actions/MemberActions';
import MemberServerActions from '../actions/MemberServerActions';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

class MemberStore {
  constructor () {
    //this.bindAction(MemberActions.create, this.create);
    console.log('store constructor');
    this.bindActions(MemberActions);
    this.bindActions(MemberServerActions);

    this.selectedMember = null;
    this.loading = false;
    this.test = 'test';
    this.errors = [];
    this.members = [];
    this.filteredMembers = [];
    this.church_name = '';
    this.church_address = '';
  }
  onSearchSuccess({members}){
    this.loading = false;
    this.filteredMembers = members;
  }
  onCreate(member) {
    //const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
    //member.id = id;
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
  search(query) {
    if (!this.state.members) {
      console.log('no members to filter');
      return;
    }
    if (!query) {
      this.setState({
        filteredMembers: this.state.members
      });
    } else {
      let filtered = _.filter(this.state.members, function(item){
        let values = _.values(item);
        for (var i=0;i<values.length;i++) {
          if ((values[i]||"").toString().toLowerCase().indexOf(query.toLowerCase()) >=0 ) {
            return true;
          }
        }
      });
      this.setState({
        loading: false,
        filteredMembers: filtered
      });
      
  }
  }
  fetchAllMembers(){
    this.setState({
      loading: true
    });
  }
  onMembersUpdated({members}) {
    console.log('onMembersUpdated store');
    console.log(members);
    this.setState({
      loading: false,
      members
    });
  }
  onSettingsUpdated({settings}) {
    console.log('onSettingsUpdated store');
    console.log(settings);
    this.setState({
     church_name: settings.church_name,
     church_address: settings.church_address 
    });

  }
  static all() {
    return this.getState().members;
  }
  static loading() {
   return this.loading;
  }
}

export default alt.createStore(MemberStore);
