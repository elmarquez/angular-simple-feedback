'use strict';

var proxy = require('../proxy/middlewares');

module.exports = {
  options: {
    port: 8072,
    hostname: 'localhost',
    livereload: 35728
  },
  dist: {
    options: {
      open: true,
      base: 'dist',
      middleware: function (connect, options, middlewares) {
        proxy.middlewares.forEach(function(fn) {
          middlewares.unshift(fn);
        });
        return middlewares;
      }
    }
  },
  livereload: {
    options: {
      open: true,
      middleware: function (connect) {
        return [
          connect.static('src/www')
        ];
      }
    }
  },
  test: {
    options: {
      base: 'dist',
      port: 8081
    }
  }
};
