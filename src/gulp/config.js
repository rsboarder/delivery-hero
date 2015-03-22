var destDir = 'public/files/';
var localConfig = {};
var srcDir = 'src/';
var path = require('path');

try {
  localConfig = require(path.resolve('./config-frontend-local.js'));
} catch(err){ }

var _  = require('lodash');
var paths = {
  dest: destDir,
  src: srcDir,

  'js': {
      dest: destDir + 'j/',
      src: [srcDir + 'js/*.{js,jsx}', srcDir + 'js/**/*.{js,jsx}']
  },
  'sass': {
      dest: destDir +'css/',
      src: srcDir + 'sass/'
  }
};

var browserifyBaseConfig = {
  cache: {},
  debug: !localConfig.isProduction,
  fullPaths: false,
  packageCache: {}
};
var path = require('path');

module.exports = {
  browserSync: {
    server: {
      baseDir: "./public/files",
      directory: true
    },
    notify: false,
    open: false,
    tunnel: false
  },
  browserify: {
    app: _.extend({}, browserifyBaseConfig, {
      entries: path.resolve(srcDir + 'js/app.js')
    }),
    dest: destDir + 'j/'
  },
  coffee: {
    bare: false
  },
  localConfig: localConfig,
  sass: {
    cacheLocation: '.sass-cache',
    container: /^win/.test(process.platform) ? '' : process.getuid() + process.cwd(),
    loadPath: './node_modules/',
    sourcemap: true,
    style: localConfig.isProduction ? 'compressed' : 'expanded',
    trace: true
  },
  paths: paths
};
