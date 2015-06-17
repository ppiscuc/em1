var remote = require('remote');
var shell = require('shell');
var app = remote.require('app');
var BrowserWindow = remote.require('browser-window');
var dialog = remote.require('dialog');

var CmdOrCtl = function() {
  if (process.platform === 'win32') {
    return 'Ctrl';
  } else {
    return 'Command';
  }
}

var Menutemplate = function() {
    return [
        {
            label: 'EM',
            submenu: [
                {
                label: 'About EM',
                click: function() {
                  dialog.showMessageBox({
                    message: 'Aplicatie de management a membrilor unei biserici.\r\n Em1 versiunea 0.1.0',
                    buttons: ['OK']
                  });
                  return;
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Hide EM',
                selector: 'hide:'
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function() { app.quit(); }
            }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Cut',
                    accelerator: CmdOrCtl() + '+X',
                    selector: 'cut:'
                },
                {
                    label: 'Copy',
                    accelerator: CmdOrCtl() + '+C',
                    selector: 'copy:'
                },
                {
                    label: 'Paste',
                    accelerator: CmdOrCtl() + 'V',
                    selector: 'paste:'
                },
                {
                    label: 'Select All',
                    accelerator: CmdOrCtl() + '+A',
                    selector: 'selectAll:'
                }
            ]
        },
        {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: CmdOrCtl() + '+R',
        click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); }
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+' + CmdOrCtl() + '+I',
        click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
      },
    ]
  },
  {
    label: 'Help',
    submenu: [{
      label: 'Trimite feedback sau erori',
      click: function() {
        shell.openExternal('http://ppiscuc.github.io/em1/');
      }
    }]
  },
];
};

module.exports = Menutemplate;
