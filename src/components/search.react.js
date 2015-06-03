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
                loading: MemberStore.loading(),
                members: MemberStore.getState().members,
                filteredMembers: MemberStore.all(),
                error: MemberStore.getState().error
            };
    },
    componentDidMount: function() {
      console.log('componentDidMount');
      this.refs.searchInput.getDOMNode().focus();
      MemberStore.listen(this.update);
      if (this.state.members.length === 0) {
        //generate a fetch action
        console.log("componentDidMount - members empty.fetching");
        MemberActions.fetchAllMembers();
      }
    },
    componentWillUnmount: function() {
      MemberStore.unlisten(this.update);
    },
    update: function() {
      console.log('update');
      this.setState({
        loading: MemberStore.getState().loading,
        members: MemberStore.getState().members,
        filteredMembers: MemberStore.getState().filteredMembers
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
      var that = this;
        //DEBUG THIS let members = _.values(this.state.members);//FIXME
        let dataloading = <div>loading ...</div>;
        if (this.state.loading) {
          dataloading = <div>loading ...</div>;
        } else if (members.length) {
          dataloading = <MemberTable members={members} handleSelect={this.handleSelect} />;
        } else if (this.state.query.lrngth) {
          dataloading = <div>Nu a fost gasit nici un membru.</div>;
        } else {
          dataloading = <div>Nici un membru.</div>;
        }
        return (
          <div className="row">
            <div className="col-md-8">
              <div>Cauta un membru pentru a vedea mai multe detalii.</div>
                <input type="search" ref="searchInput" className="form-control"
                placeholder="Cauta" onChange={that.handleChange}/>
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
