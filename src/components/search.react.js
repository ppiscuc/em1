var React = require('react');
var Router = require('react-router');
var _ = require('underscore');
var MemberStore = require('../stores/MemberStore');
var MemberActions = require('../actions/MemberActions');
var MemberRow = require('./memberrow.react');

var Search = React.createClass({
    contextTypes: {
          router: React.PropTypes.func
    },
    getInitialState: function() {
            return {
                query: '',
                currentMember: {},
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
    handleChange: function(e) {
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
      //check if we have a selected member
      let currentmember;
      let sentMemberId = this.context.router.getCurrentParams().memberId  || {};
      if (!_.isEmpty(sentMemberId)) {
        currentmember = _.find(this.state.members, function(mem){
          return (sentMemberId === mem._id);
        });
      } else {
        currentmember = {};
      }
      console.log('render - filtered', this.state.filteredMembers);
      let filteredMembers = this.state.filteredMembers;
      let results;
      if (this.state.loading) {
        results = <div className="no-results">loading ...</div>;
        } else if (filteredMembers.length) {
          let memberRows = filteredMembers.map(function(member){
            return <MemberRow key={member._id} member={member} />;
          });
      let header = (
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
      results = (
                <table className="table table-stripped">
                        {header}
                        <tbody>
                                {memberRows}
                        </tbody>
                </table>
                );
        } else if (this.state.query.length) {
          results = <div>Nu a fost gasit nici un membru.</div>;
        } else {
          results = <div>Nici un membru.</div>;
        }
        return (
          <div className="row">
            <div className="col-md-8" id="searchContainer">
              <div>Cauta un membru pentru a vedea mai multe detalii.</div>
                <input type="search" ref="searchInput" className="form-control"
                placeholder="Cauta" onChange={that.handleChange}/>
                <div className="results">
                  {results}
                </div>
              </div>
              <div className="col-md-4">
                <Router.RouteHandler currentmember={currentmember} />
              </div>
            </div>
        );
    }
});

module.exports = Search;
