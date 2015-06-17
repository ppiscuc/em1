var os = require('os');
var pkgjson = require('./package.json');
var path = require('path');
var shell = require('shelljs');

var version = pkgjson.version;
var name = pkgjson.name
var packer = './node_modules/.bin/electron-packager';
var electronVersion = '0.26.1';
var icon = './images/icon.icns';

var package = function(platform, arch) {
  var outPath = path.join('.', 'dist', version, platform, arch);
  shell.exec('./node-modules/.bin/rimraf' + outPath);

  var cmd = packer + ' . ' + name + ' --platform=' + platform +
            ' --arch=' + arch +
            ' --version=' + electronVersion +
            ' --app-version=' + version +
            ' --icon=' + icon +
            ' --out=' + outPath +
            ' --prune' +
            ' --ignore=dist' +
            ' --ignore=node_modules/electron' +
            ' --ignore=node_modules/pouchdb/docs' +
            ' --ignore=src' +
            ' --ignore=gulpfile.js';
  console.log(cmd);
  shell.exec(cmd);
}

if (process.argv[2] === '--all') {
  var archs = ['ia32','x64'];
  var platforms = ['linux','win32','darwin'];

  platforms.forEach(function(platform){
    arch.forEach(function(arch){
      if (platform === 'darwin' && arch === 'ia32') {
        return;
      }
      package(platform, arch);
    });
    });
} else {
      package(os.platform(), os.arch());
}
