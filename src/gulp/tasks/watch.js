var browserSync = require('browser-sync');
var gulp = require('gulp');
var watch = require('gulp-watch');

var config = require('../config');
var paths = config.paths;

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch(paths.js.src, ['app', browserSync.reload]);
  gulp.watch(paths.sass.src + '*', ['sass', browserSync.reload]);
});
