var gulp = require('gulp');
var helpers = require('../helpers');
var paths = require('../config').paths;
var Q = require('q');

gulp.task('clean-build-dirs', function () {
  var deferred = Q.defer();
  var result = [
    paths.js.dest,
    paths.sass.dest
  ].map(function(path){
    return helpers.cleanDir(path);
  });

  Q.all(result).then(deferred.resolve, deferred.reject);

  return deferred.promise;
});
