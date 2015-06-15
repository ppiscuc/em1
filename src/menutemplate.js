var remote = require('remote');
var app = remote.require('app');
var BrowserWindow = remote.require('browser-window');

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
                selector: 'orderFrontStandardAboutPanel:'
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
        accelerator: 'Command+R',
        click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); }
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
      },
    ]
  },
  {
    label: 'Help',
    submenu: [{
      label: 'Trimite feedback sau eror',
      click: function() {
        shell.openExternal('https://github.com/ppiscuc/em1/issues/new');
      }
    }]
  },
];
};

module.exports = Menutemplate;
