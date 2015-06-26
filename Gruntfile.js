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
  less: {
    options: {
	sourceMapFileInline: true
    },
    dist: {
	files: {
          'build/main.css':'styles/main.less'
	}
    }
  },
  shell: {
    electron: {
      command: electron + ' ' + 'build',
      options: {
        async: true,
        execOptions: {
          env: env
        }
      }
    }
  },
  watchChokidar: {
    options: {
      spawn: true
    },
    livereload: {
      options: {
        livereload: true
      },
      files: ['build/**/*']
    },
    js: {
      files: ['src/**/*.js'],
      tasks: ['newer:babel']
    },
    less: {
      files: ['styles/**/*.less'],
      tasks: ['less']
    },
    copy: {
      files: ['images/*', 'index.html', 'fonts/*'],
      tasks: ['newer:copy:dev']
    }
  },
  copy: {
    dev: {
      files: [{
        expand: true,
        cwd: '.',
        src: ['package.json', 'index.html'],
        dest: 'build/'
      }, {
        expand: true,
        cwd: 'images/',
        src: ['**/*'],
        dest: 'build/'
      }, {
        expand: true,
        cwd: 'fonts/',
        src: ['**/*'],
        dest: 'build'
      }, {
        expand: true,
        cwd: 'node_modules',
        src: _.keys(packageJson.dependancies).map(function(dep){ return dep + '/**/*'}),
        dest: 'build/node_modules',
      }]
    } ,
  },
 }); 
  if (process.platform == 'win32') {
    grunt.registerTask('default', ['newer:babel', 'less', 'newer:copy:dev', 'shell:electron', 'watchChokidar']);
    grunt.registerTask('release', ['clean:release', 'babel', 'less', 'copy:dev', 'electron:windows'])
  }
  process.on('SIGINT', function() {
    grunt.task.run(['shell:electron:kill']);
    process.exit(1);
  });

}
