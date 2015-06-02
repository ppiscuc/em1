var React = require('react');
var Router = require('react-router');
var _ = require('underscore');
var MemberStore = require('../stores/MemberStore');
var MemberActions = require('../actions/MemberActions');
var MemberTable = require('./MemberTable.react');

var Search = React.createClass({
    mixins: [Router.State],
    getInitialState: function() {
            return {
                query: '',
                loading: MemberStore.getState().loading,
                members: MemberStore.getState().members,
                error: MemberStore.getState().error
            };
    },
    componentDidMount: function() {
      this.refs.searchInput.getDOMNode().focus();
      MemberStore.listen(this.update);
      if (this.state.members.length === 0) {
        //generate a fetch action
        MemberActions.fetchAllMembers();
      }
    },
    componentWillUnmount: function() {
      MemberStore.unlisten(this.update);
    },
    update: function() {
      this.setState({
        loading: MemberStore.getState().loading,
        members: MemberStore.getState().members
      });
    },
    search: function(query) {
      this.setState({
        query: query,
        loading: true
      });
      MemberActions.search(query);
    },
    handleChange: function() {
      var query = e.target.value;
      if (query === this.state.query) {
        return;
      }
      this.search(query);
    },
    handleSelect: function(index) {
      console.log('handleselect');
      console.log(index);
    },
    render: function () {
        let members = _.values(this.state.members);
        let dataloading = <div>loading ...</div>;
        if (members.length > 0 ) {
          dataloading = <MemberTable members={members} handleSelect={this.handleSelect} />;
        }
        return (
          <div className="row">
            <div className="col-md-8">
              <div>Search for a member to see more details.</div>
                <input type="search" ref="searchInput" className="form-control"
                placeholder="Cauta" onChange={this.handleChange}/>
                <div className="results">
                  {dataloading}
                </div>
              </div>
              <div className="col-md-4">
                <Router.RouteHandler />
              </div>
            </div>
        );
    }
});

module.exports = Search;
