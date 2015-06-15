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
      let church_name = this.state.church_name;
      let church_address = this.state.church_address;
      let casatoriti = _.filter(members, function(member){
        return (member.marital_status === 'casatorit');  
      });
      let vaduvi = _.filter(members, function(member){
        return (member.marital_status === 'vaduv');
      });
      let casatoriti;
      let copii;
      let batrani;
        return (
          <div>
            <h1>EM1</h1>
            <p class="lead">O aplicatie pentru evidenta membrilor unei biserici</p>
            <h3>{church_name}<h3>
            <h4>{church_address}<h4>
            <strong>Statistici</strong>
            <p>{members.length} membrii </p>
            <p>{casatoriti.length} membrii casatoriti</p>
            <p>{vaduvi.length} vaduvi</p>
            <p>{copii.length} copii</p>
            <p>{batrani.length} batrani</p>
          </div>
        );
    }
});

module.exports = Dashboard;
