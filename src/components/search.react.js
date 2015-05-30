var React = require('react');
var Router = require('react-router');

var Search = React.createClass({
    mixins: [Router.State],
    getInitialState: function() {
            return {
                query: '',
                loading: MembersStore.loading(),
                members: MembersStore.all(),
                error: MembersStore.getState().error
            }
    },
    componentDidMount: function() {
      this.refs.searchInput.getDOMNode().focus();
      MembersStore.listen(this.update);
      MembersStore.search();
    },
    componentWillUnmount: function() {
      MembersStore.unlisten(this.update);
    },
    update: function() {
      this.setState({
        loading: MembersStore.loading(),
        members: MembersStore.all()
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
    handleFilter: function() {

    },
    render: function () {
        let filter = this.getQuery().filter || 'all';
        let members = _.values(this.state.members);

        return (
          <div>
            <div>Search for a member to see more details.</div>
              <input type="search" ref="searchInput" className="form-control"
                placeholder="Search Docker Hub for an image" onChange={this.handleChange}/>
              <div class="results">
                {members}
              </div>
            </div>

        );
    }
});

module.exports = Search;
