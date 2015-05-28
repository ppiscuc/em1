var app = require('app');
var url = require('url');
var path = require('path');
var fs = require('fs');
var spawn = require('child_process').spawn;
var ipc = require('ipc');
var path = require('path');

process.env.NODE_PATH = path.join(__dirname,'/../node_modules');
process.chdir(path.join(__dirname,'..'));
process.env.PATH = '/usr/local/bin:' + process.env.PATH;

var BrowserWindow = require('browser-window');
var Menu = require('menu');
var menutemplate = require('./menutemplate.js');

require('crash-reporter').start();

//keep a reference to the window object, otherwise it will be destroyed at gc
var mainWindow = null;

app.on('window-all-closed', function(){
    if (process.platform != 'darwin')
        app.quit();
});

var nslog = console.log;

global.shellStartTime = Date.now();


var menu = Menu.buildFromTemplate(menutemplate);
//wait for electron initialization
app.on('ready', function(){
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 780,
        'min-width': 1000,
        'min-height': 600,
        'standard-window': false,
        resizable: true,
        frame: false
        title: 'EM'
        });
    Menu.setApplicationMenu(menu);
    mainWindow.loadUrl('file://' + path.ojoin(__dirname,'..', 'build/index.html');
    //open devtools
    mainWindow.openDevTools();
    //event emited on close
    mainWindow.on('closed', function(){
        //derefence
        mainWindow = null;
    });

});
