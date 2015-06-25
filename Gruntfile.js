var path = require('path');
var packageJson = require('./package.json');
var electron = require('electron-prebuilt');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
 grunt.initConfig({
  APPNAME: 'EM1',

  electron: {
    windows: {
      options: {
        name: '<%= APPNAME =>',
        dir: 'build/',
        out: 'dist/',
        version: packageJson['electron-version'],
        platform: 'win32',
        arch: 'x64',
        asar: true,
        icon: 'images/em1.ico'
      },
   osx: {
    options: {
      name: '<%= APPNAME >',
      dir: 'build/',
      out: 'dist/osx',
      version: packageJson['electron-version'],
      platform: 'darwin',
      arch: 'x64',
      asar: true
    }
   }}
  },
  'windows-installer': {
    appDir: 'dist/EM1-win32',
    authors: 'ppiscuc',
    loadingGif: 'images/loading.gif',
    setupIcon: 'images/em1.ico'
  },
  babel: {
    options: {
      sourceMap: 'inline',
      blacklist: 'regenerator'
    },
    dist: {
      files: [{
        expand: true,
        cwd: 'src/',
        src: ['**/*.js'],
        dest: 'build/',
      }]
    }
  },
  clean: {
    release: ['build/', 'dist/', 'installer/'],
  },
  copy: {
    
  },
 }); 


}
