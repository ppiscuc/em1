require.main.paths.splice(0,0, process.env.NODE_PATH);
var remote = require('remote');
var Menu = remote.require('menu');
var React = require('react');
var routes = require('./routes');
var app = remote.require('app');
var Router = require('react-router');
var routerContainer  = require('./router');
var template = require('./menutemplate');
var path = require('path');
var PouchDB = require('PouchDB');
//actions

if (typeof window.wpouch !== 'undefined') {
  console.log('db initialized');
} else {
  window.wpouch = new PouchDB('members');
}

var router = Router.create({
    routes: routes
});
router.run(function(Handler, state) {
   React.render(<Handler {...state} />, document.getElementById('content'));
});

routerContainer.set(router);
//initialize the store
Menu.setApplicationMenu(Menu.buildFromTemplate(template()));


module.export = {
  router: router
};
