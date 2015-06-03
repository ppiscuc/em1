var React = require('react');
var Router = require('react-router');
var MemberStore = require('../stores/MemberStore');
var MemberActions = require('../actions/MemberActions');

var Reports = React.createClass({
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
    render: function () {
        return (
          <div>
          Reports
          </div>
        );
    }
});

module.exports = Reports;
