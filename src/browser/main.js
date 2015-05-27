app = require('app');
url = require('url');
path = require('path');
fs = require('fs');
spawn = require('child_process').spawn;


var BrowserWindow = require('browser-window');

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
    mainWindow = new BrowserWindow({width: 800, height: 600});
    console.log(__dirname);
    mainWindow.loadUrl('file://' + __dirname + '../../../index.html');
    //open devtools
    mainWindow.openDevTools();
    //event emited on close
    mainWindow.on('closed', function(){
        //derefence
        mainWindow = null;
    });

});
