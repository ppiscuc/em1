var React = require('react');
var Router = require('react-router');
var _ = require('underscore');

var MemberTable = React.createClass({
  render: function() {
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
    var nodes = this.props.members.map(function(row, index){
      return (
        <tr >
            <td>{row.first_name}</td>
            <td>{row.last_name}</td>
            <td>{row.birth_date}</td>
            <td>{row.mobile}</td>
            <td>{row.city}</td>
        </tr>
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
