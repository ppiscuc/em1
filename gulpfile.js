var gulp = require('gulp');
var changed = require('gulp-changed');
var fs = require('fs');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');

var options = {
  dev: process.argv.indexOf('release') === -1,
}

gulp.task('js', function(){
  return gulp.src('src/**/*.js')
         .pipe(gulpif(options.dev,changed('./build')))
         .pipe(plumber(function(error){
            gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
            this.emit('end');
         }))
         .pipe(gulp.dest('./build'))
         .pipe(gulpif(options.dev, livereload()));
});
gulp.task('styles', function(){
  return gulp.src('styles/main.css')
    .pipe(plumber(function(error) {
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      this.emit('end');
    }))
    .pipe(gulpif(options.dev, changed('./build')))
    .pipe(gulp.dest('./build'))
    .pipe(gulpif(options.dev, livereload()));

});
gulp.task('copy',function(){
  gulp.src('index.html')
  .pipe(gulp.dest('./build'))
  .pipe(gulpif(options.dev,livereload()));
});

gulp.task('default', ['copy', 'js', 'styles'], function(){
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('index.html', ['copy']);
  
  livereload.listen();

  var env = process.env;
  env.NODE_ENV = 'development';

  if (process.platform === 'linux') {
    gulp.src('').pipe(shell(['electron .'], {
        env: env
  }));
  } else {
    gulp.src('').pipe(shell(['./cache/Electron.app/Contents/MacOS/Electron .'], {
        env: env
    }));
 }
});
