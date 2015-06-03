var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;

var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var Container = require('./components/container.react');
var Search = require('./components/search.react');
var MemberDetail = require('./components/memberdetail.react');
var SearchStats = require('./components/searchstats.react');
var NewMember = require('./components/newmember.react');
var Settings = require('./components/settings.react');
var Dashboard = require('./components/dashboard.react');



var routes = (
    <Route name="app" path="/" handler={Container}>
        <Route name="search" path="/search" handler={Search}>
            <Route name="memberdetail" path="/search/:memberId" handler={MemberDetail} />
            <DefaultRoute handler={SearchStats} />
        </Route>
        <Route name="newmember" path="/newmember" handler={NewMember} />
        <Route name="settings" path="/settings" handler={Settings} />
        <DefaultRoute name="dashboard" path="/dashboard" handler={Dashboard} />
    </Route>
);




module.exports = routes;
