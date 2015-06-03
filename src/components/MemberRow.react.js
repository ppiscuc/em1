var React = require('react');
var Router = require('react-router');
var _ = require('underscore');

var MemberRow = React.createClass({
  mixins: [Router.Navigation],
  onClick: function(element) {
    console.log('onClick');
    let selmember = this.props.member;
    this.transitionTo('memberdetails',{member: selmember});
  },
  render: function() {
    var that = this;
    return (
      <tr onClick="this.handleClick">
        <td>{that.props.member.first_name}</td>
        <td>{that.props.member.last_name}</td>
        <td>{that.props.member.birth_date}</td>
        <td>{that.props.member.mobile}</td>
        <td>{that.props.member.city}</td>
      </tr>
    );
  }
});

module.exports = MemberRow;
