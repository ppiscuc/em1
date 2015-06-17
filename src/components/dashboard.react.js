var React = require('react');
var Router = require('react-router');
var MemberStore = require('../stores/MemberStore');
var MemberActions = require('../actions/MemberActions');
var _ = require('underscore');

var Dashboard = React.createClass({
  getInitialState: function() {
    return MemberStore.getState();
  },
  componentDidMount: function() {
    MemberStore.listen(this.update);
      if (this.state.members.length === 0) {
        //generate a fetch action
        console.log('componentDidMount - members empty.fetching');
        MemberActions.fetchAllMembers();
      }
  },
  componentWillUnmount: function() {
    MemberStore.unlisten(this.update);
  },
  update: function() {
    this.setState(MemberStore.getState());
  },
  handleClick: function() {
    MemberActions.changeTest('newvalue');
  },
    render: function () {
      let members = this.state.members;
      let memberscount = members.length;
      let church_name = this.state.church_name;
      let church_address = this.state.church_address;
      let casatoriti = _.filter(members, function(member){
        return (member.marital_status === 'casatorit');  
      }).length;
      let vaduvi = _.filter(members, function(member){
        return (member.marital_status === 'vaduv');
      }).length;
      let today = new Date();
      let copii = _.filter(members, function(member){
        let timestamp = Date.parse(member.birth_date);
        if (isNaN(timestamp)===true) {
          return false;
        }
        let bdate = new Date(timestamp);
        let yearsapart = new Date(today - bdate).getFullYear() - 1970;
        return (yearsapart <= 18);
      }).length;
      let batrani = _.filter(members, function(member){
        let timestamp = Date.parse(member.birth_date);
        if (isNaN(timestamp)===true) {
          return false;
        }
        let bdate = new Date(timestamp);
        let yearsapart = new Date(today - bdate).getFullYear() - 1970;
        return (yearsapart >= 60);
      }).length;
        return (
          <div>
            <h1>EM1</h1>
            <p class="lead">O aplicatie pentru evidenta membrilor unei biserici</p>
            <h3>{church_name}</h3>
            <h4>{church_address}</h4>
            <strong>Statistici</strong>
            <p>{memberscount} membrii </p>
            <p>{casatoriti} membrii casatoriti</p>
            <p>{vaduvi} vaduvi</p>
            <p>{copii} copii</p>
            <p>{batrani} batrani</p>
          </div>
        );
    }
});

module.exports = Dashboard;
