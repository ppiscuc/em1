import alt from '../alt';
import MemberActions from '../actions/MemberActions.js';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

class MemberStore {
  constructor() {
    //this.bindAction(MemberActions.create, this.create);
    this.bindActions(MemberActions);
  }
  this.selectedMember = null;
  this.loading = false;
  this.errors = {};
  this.members = [];
  this.filteredMembers = [];

  onSearch() {
    this.loading = true;
  }
  onSearchSuccess(members){
    this.loading = false;
    this.filteredMembers = members;
  }
  onCreate(member) {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
    member.id = id;
    this.members.push(member);

  }
  onUpdate(id, update) {
    this.members[id] = assign(this.members[id], update);
  }
  onSelect(member) {
    this.selectedMember = member;
  }
  static getMembers() {
    return this.getState().members;
  }

}
export default alt.createStore(MemberStore);
