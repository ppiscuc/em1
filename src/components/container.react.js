var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
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
        //var church_name = this.props.settings.church_name;
        //var church_address = this.props.settings.church_address;
        //var church_city = this.props.settings.church_city;
        return (
            <div className="row row-eq-height">
                <div className="col-md-2" id="sidebar">
                  <div id="navigator">
                    <ul>
                        <li><Link to="app">Dashboard</Link></li>
                        <li><Link to="search">Cauta</Link></li>
                        <li><Link to="newmember">Adauga</Link></li>
                        <li><Link to="reports">Rapoarte</Link></li>
                        <li><Link to="settings">Setari</Link></li>
                    </ul>
					          {this.state.errors}
                  </div>
                  <div id="runstate">
                    <p>We are using io.js {remote.process.version} and Electron {remote.process.versions['electron']}.</p>
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
