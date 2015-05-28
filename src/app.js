require.main.path.splice(0,0, process.env.NODE_PATH);
var remote = require('remote');
var Menu = remote.require('menu');
var React = require('react');
var router = require('./router');
var app = remote.require('app');
var Router = require('react-router');
var routes = require('./routes');
var template = require('./menutemplate');

Menu.setApplicationMenu(Menu.buildFromTemplate(template()));

var router = Router.create({
  routes: routes
});
router.run(Handler => React.render(<Handler/>, document.body));
routerContainer.set(router);

module.export = {
  router: router
};
