var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var MemberStore = require('../stores/MemberStore');

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
            <div className="row">
                <div className="col-md-2">
                    <ul>
                        <li><Link to="app">Dashboard</Link></li>
                        <li><Link to="search">Cauta</Link></li>
                        <li><Link to="newdata">Adauga</Link></li>
                        <li><Link to="settings">Setari</Link></li>
                    </ul>

					          {this.state.errors}
                </div>
                <div className="col-md-10">
                    <Router.RouteHandler errors={this.state.errors} loading={this.state.loading} {...this.props} />
                </div>
            </div>
        );
    }
});

module.exports = Container;
