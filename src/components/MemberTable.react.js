var React = require('react');
var Router = require('react-router');
var _ = require('underscore');

var RowWrapper = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.data.first_name}</td>
        <td>{this.props.data.last_name}</td>
        <td>{this.props.data.birth_date}</td>
        <td>{this.props.data.mobile}</td>
        <td>{this.props.data.city}</td>
      </tr>
    );
  }
});
var MemberTable = React.createClass({
  render: function() {
    var that = this;
    var header = (
      <thead>
        <tr>
          <th data-title="nume" key="nume">Nume</th>
          <th data-title="prenume" key="prenume">Prenume</th>
          <th data-title="datanasterii" key="datanasterii">Data nasterii</th>
          <th data-title="mobile" key="mobile">Mobil</th>
          <th data-title="oras" key="oras">Oras</th>
        </tr>
      </thead>
    );
    if (!this.props.members) {
      return (<div>no members loaded</div>);
    }
    let nodes = this.props.members.map(function(row){
        return (
          <RowWrapper onClick={that.props.handleSelect} key={row._id} data={row} />
        );
      });

    return (
      <table className="table table-stripped">
        {header}
        <tbody>
          {nodes}
        </tbody>
      </table>
    );
  }
});

module.exports = MemberTable;
