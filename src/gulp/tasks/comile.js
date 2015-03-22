var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('compile', ['clean-build-dirs'], function(){
  runSequence([
      'app',
      'sass'
  ]);
});
