var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Container = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function() {
        return {
            data: []
        };
    },
    render: function () {
        //var church_name = this.props.settings.church_name;
        //var church_address = this.props.settings.church_address;
        //var church_city = this.props.settings.church_city;
        var message = <p></p>;
		if (this.state.successmessage) {
			message = <p class="text-center text-success">{this.state.successmessage}</p>;
		}
        if (this.state.failmessage) {
			message = <p class="text-center text-danger">{this.state.failmessage}</p>;
		}
        return (
            <div className="row">
                <div className="col-md-2">
                    <ul>
                        <li><Link to="app">Dashboard</Link></li>
                        <li><Link to="search">Cauta</Link></li>
                        <li><Link to="newdata">Adauga</Link></li>
                        <li><Link to="settings">Setari</Link></li>
                    </ul>

					{message}
                </div>
                <div className="col-md-10">
                    <Router.RouteHandler errors={this.state.errors} loading={this.state.loading} {...this.props} />
                </div>
            </div>
        );
    }
});

module.exports = Container;
