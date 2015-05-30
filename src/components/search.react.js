var React = require('react');
var Router = require('react-router');

var Search = React.createClass({
    mixins: [Router.State],
    getInitialState: function() {
            return {
                query: '',
                loading: MembersStore.loading(),
                members: MembersStore.getState().members,
                error: MembersStore.getState().error
            }
    },
    componentDidMount: function() {
      this.refs.searchInput.getDOMNode().focus();
      MemberStore.listen(this.update);
    },
    componentWillUnmount: function() {
      MemberStore.unlisten(this.update);
    },
    update: function() {
      this.setState({
        loading: MemberStore.loading(),
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
    render: function () {
        let members = _.values(this.state.members);
        let results = _.
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
