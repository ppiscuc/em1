var app = require('app');
var url = require('url');
var path = require('path');
var BrowserWindow = require('browser-window');
var fs = require('fs');
var spawn = require('child_process').spawn;
var ipc = require('ipc');
var path = require('path');

process.env.NODE_PATH = path.join(__dirname,'/../node_modules');
process.chdir(path.join(__dirname,'..'));
process.env.PATH = '/usr/local/bin:' + process.env.PATH;
process.env.NODE_ENV="development";


require('crash-reporter').start();

//keep a reference to the window object, otherwise it will be destroyed at gc
var mainWindow = null;


app.on('window-all-closed', function(){
    if (process.platform != 'darwin')
        app.quit();
});

var nslog = console.log;

global.shellStartTime = Date.now();


//wait for electron initialization
app.on('ready', function(){
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 780,
        'min-width': 1000,
        'min-height': 600,
        'standard-window': false,
        resizable: true,
        frame: true,
        show: false,
        title: 'EM'
        });

    mainWindow.loadUrl('file://' + path.join(__dirname,'..', 'build/index.html'));
    //open devtools
    app.on('activate-with-no-open-windows', function(){
        if (mainWindow) {
            mainWindow.show();
            mainWindow.openDevTools();
        }
    });
    //event emited on close
    mainWindow.on('closed', function(){
        //derefence
        mainWindow = null;
    });

});
