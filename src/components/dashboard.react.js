var React = require('react');
var Router = require('react-router');
var MemberStore = require('../stores/MemberStore');
var MemberActions = require('../actions/MemberActions');

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
        return (
          <div>
            <div>{this.state.test}</div>
            <button onClick={this.handleClick}>Change it</button>
          </div>
        );
    }
});

module.exports = Dashboard;
