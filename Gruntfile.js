var path = require('path');
var packageJson = require('./package.json');
var electron = require('electron-prebuilt');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var target = grunt.option('target') || 'development';
    var env = process.env;
    env.NODE_PATH = '..:' + env.NODE_PATH;
    env.NODE_ENV = target;
    var APPNAME = 'EM1';
    //project configuration
    grunt.initConfig({
        APPNAME: 'EM1',
        //grunt-electron packager
        electron: {
            windows: {
                options: {
                    name: APPNAME,
                    dir: 'build/',
                    out: 'dist/',
                    version: packageJson['electron-version'],
                    platform: 'win32',
                    arch: 'x64',
                    asar: true,
                    icon: 'images/em1.ico'
                }
            },
                osx: {
                    options: {
                        name: APPNAME,
                        dir: 'build/',
                        out: 'dist/osx',
                        version: packageJson['electron-version'],
                        platform: 'darwin',
                        arch: 'x64',
                        asar: true,
                        'app-bundle-id': 'com.em1.em1',
                        'app-version': packageJson.version
                }}
        },
        rcedit: {
          exec: {
            files: [{
              expand: true,
              cwd: 'dist/' + APPNAME + '-win32',
              src: [APPNAME + '.exe']
            }],
            options: {
              icon: 'images/em1.ico',
              'file-version': packageJson.version,
              'product-version': packageJson.version,
              'version-string': {
                'ProductVersion': packageJson.version,
                'ProductName': APPNAME,
                'FileDescription': APPNAME,
                'InternalName': APPNAME + '.exe',
                'OriginalFilename': APPNAME + '.exe'
              }
            }
          }
        },
        //grunt-electron-installer windows installer
        'create-windows-installer': {
            appDir: 'dist/' + APPNAME + '-win32',
            authors: 'ppiscuc',
            loadingGif: 'images/loading.gif',
            setupIcon: 'images/em1.ico',
            exe: APPNAME + '.exe',
            description: 'Aplicatie de management a membrilor unei biserici',
            title: APPNAME,
            version: packageJson.version
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
                    dest: 'build/'
                }]
            }
        },
        clean: {
            release: ['build/', 'dist/', 'installer/']
        },
        less: {
            options: {
                sourceMapFileInline: true
            },
            dist: {
                files: {
                    'build/main.css': 'styles/main.less'
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
                    cwd: 'node_modules/',
                    src: Object.keys(packageJson.dependencies).map(
                      function(dep){
                        return dep + '/**/*';
                      }),
                    dest: 'build/node_modules'
                }]
            }
        }
    });
    if (process.platform === 'win32') {
        grunt.registerTask('default', ['newer:babel', 'less', 'newer:copy:dev', 'shell:electron', 'watchChokidar']);
        grunt.registerTask('release', ['clean:release', 'babel', 'less', 'copy:dev', 'electron:windows', 'create-windows-installer']);
    } else {
        grunt.registerTask('default', ['newer:babel', 'less', 'newer:copy:dev', 'shell:electron', 'watchChokidar']);
        grunt.registerTask('release', ['clean:release', 'babel', 'less', 'copy:dev', 'electron:osx']);
    }
    process.on('SIGINT', function() {
        grunt.task.run(['shell:electron:kill']);
        process.exit(1);
    });

};
