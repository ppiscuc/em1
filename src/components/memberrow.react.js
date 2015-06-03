var React = require('react');
var Router = require('react-router');


var MemberRow = React.createClass({
  contextTypes: {
        router: React.PropTypes.func
  },
  handleClick: function(element) {
    var that = this;
    element.preventDefault();
    console.log('onClick');
    this.context.router.transitionTo('memberdetails', {memberId: that.props.member._id});
  },
  render: function() {
    var that = this;
    return (
      <tr onClick={this.handleClick} >
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
