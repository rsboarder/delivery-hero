var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var source = require('vinyl-source-stream');

var config = require('../config');
var helpers = require('../helpers');
var browserifyConfig = config.browserify;

function buildApp (fileName, appType) {
  var bundler = browserify(
    browserifyConfig[appType]
  );

  bundler.on('error', gutil.log);

  bundler.transform({debug: true}, 'reactify');
  bundler.transform({
    NODE_ENV: config.localConfig.ENV ? config.localConfig.ENV : ''
  }, 'envify');

  bundler.transform('brfs');

  return rebundle(fileName, bundler);
}

function rebundle (fileName, bundler) {
  var stream = bundler.bundle();

  gutil.log('Rebundle ' + fileName + ' ...');

  return stream.on('error', gutil.log)
    .pipe(source(fileName))
    .pipe(gulp.dest(config.browserify.dest));
}

gulp.task('app', function () {
  return buildApp('app.js', 'app');
});
