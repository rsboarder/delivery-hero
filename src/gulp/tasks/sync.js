var browserSync = require('browser-sync');
var config = require('../config');
var gulp = require('gulp');

gulp.task('browser-sync', function () {
  browserSync(config.browserSync);
});
