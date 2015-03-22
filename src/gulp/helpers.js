var _ = require('lodash');

var config = require('./config');
var del = require('del');
var path = require('path');
var Q = require('q');

module.exports = {
  cleanDir: function (dirs) {
    var deferred = Q.defer();
    del(dirs, {force: true}, deferred.resolve, deferred.reject);
    return deferred.promise;
  },
  getVendorsList: function () {
    var paths = config.paths.vendors;
    var vendorsPath = paths.src;

    return [
      vendorsPath + 'jquery/dist/jquery.min.js',
      vendorsPath + 'angular/angular.js',
      vendorsPath + 'angular-cookies/angular-cookies.js',
      vendorsPath + 'angular-ui-utils/ui-utils.min.js',
      vendorsPath + 'angular-ui-router/release/angular-ui-router.js',
      vendorsPath + 'ui-router-extras/release/ct-ui-router-extras.js',
      vendorsPath + 'devbridge-autocomplete/dist/jquery.autocomplete.js',
      vendorsPath + 'angular-loading-bar/build/loading-bar.min.js',
      vendorsPath + 'leaflet/dist/leaflet.js',
      vendorsPath + 'leaflet-plugins/layer/tile/Google.js',
      vendorsPath + 'moment/min/moment-with-locales.min.js',
      vendorsPath + 'moment-duration-format/lib/moment-duration-format.js',
      vendorsPath + 'underscore/underscore-min.js',
      config.paths.src + 'js/libs/*.js'
    ];
  },
  getBowerPackageIds: function () {
    // read bower.json and get dependencies' package ids
    var bowerManifest = {};
    try {
      bowerManifest = require(path.resolve('./bower.json'));
    } catch (e) {
      // does not have a bower.json manifest
    }

    return _.keys(bowerManifest.dependencies) || [];
  },
  getNPMPackageIds: function () {
    // read package.json and get dependencies' package ids
    var packageManifest = {};
    try {
      packageManifest = require(path.resolve('./package.json'));
    } catch (e) {
      // does not have a package.json manifest
    }

    return _.keys(packageManifest.dependencies) || [];
  }
};
