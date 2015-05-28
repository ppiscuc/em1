require.main.paths.splice(0,0, process.env.NODE_PATH);
var remote = require('remote');
var Menu = remote.require('menu');
var React = require('react');
var routes = require('./routes');
var app = remote.require('app');
var Router = require('react-router');

var template = require('./menutemplate');
//actions


var router = Router.create({
    routes: routes
});

router.run(routes, function(Handler){
    React.render(<Handler/>, document.getElementById('content'));
});

routerContainer.set(router);
//initialize the store
Menu.setApplicationMenu(Menu.buildFromTemplate(template()));


module.export = {
  router: router
};
