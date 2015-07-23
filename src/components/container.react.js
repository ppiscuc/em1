var React = require('react');
var Router = require('react-router');
var MemberStore = require('../stores/MemberStore');
var remote = require('remote');

var Container = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function() {
      return {
        errors: []
      };
    },
    componentDidMount: function() {
      MemberStore.listen(this.update);
    },
    componentWillUnmount: function() {
      MemberStore.unlisten(this.update);
    },
    update: function() {
      let state = MemberStore.getState();
      this.setState({
        errors: MemberStore.getState().errors || []
      });
    },
    render: function () {
        return (
            <div className="row row-eq-height no-gutter">
                <div className="col-md-2" id="sidebar">
                  <div id="navigator">
                    <ul>
                        <Router.Link to="dashboard"><li>Dashboard</li></Router.Link>
                        <Router.Link to="search"><li>Cauta</li></Router.Link>
                        <Router.Link to="newmember"><li>Adauga</li></Router.Link>
                        <Router.Link to="settings"><li>Setari</li></Router.Link>
                    </ul>
					          {this.state.errors}
                  </div>
                  <div id="runstate">
                    <p>io.js {remote.process.version} | Electron {remote.process.versions['electron']}</p>
                  </div>
                </div>
                <div className="col-md-10" id="overview">
                    <Router.RouteHandler errors={this.state.errors} loading={this.state.loading} {...this.props} />
                </div>
            </div>
        );
    }
});

module.exports = Container;
