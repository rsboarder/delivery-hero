var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

var config = require('../config');
var paths = config.paths.sass;
var sassConfig = config.sass;

gulp.task('sass', function () {
  return sass(paths.src, sassConfig).on('error', gutil.log)

    .pipe(gulpif(!config.isProduction, sourcemaps.init({ loadMaps: true })))
      .pipe(autoprefixer('last 2 version', "> 1%", "ie 9", {
        cascade: false
      }))
    .pipe(gulpif(!config.isProduction, sourcemaps.write('.')))

    .pipe(gulp.dest(paths.dest));
});
