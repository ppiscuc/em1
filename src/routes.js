var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;

var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

// var MainApp = require('./components/app.jsx');
// var Search = require('./components/search.jsx');
// var MemberDetail = require('./components/memberdetail.jsx');
// var SearchStats = require('./components/searchstats.jsx');
// var NewMember = require('./components/newmember.jsx');
// var Settings = require('./components/settings.jsx');
// var Dashboard = require('./components/dashboard.jsx');
var Container = require('./components/container.react');
var Search = require('./components/search.react');
var MemberDetail = require('./components/memberdetail.react');
var SearchStats = require('./components/searchstats.react');
var NewMember = require('./components/newmember.react');
var Settings = require('./components/settings.react');
var Dashboard = require('./components/dashboard.react');


var routes = (
    <Route name="app" path="/" handler={Container}>
        <Route name="search" handler={Search}>
            <Route name="info" path=":memberId" handler={MemberDetail} />
            <DefaultRoute handler={SearchStats} />
        </Route>
        <Route name="newdata" handler={NewMember} />
        <Route name="settings" handler={Settings} />
        <DefaultRoute name="dashboard" handler={Dashboard} />
    </Route>
);




module.exports = routes;
