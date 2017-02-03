'use strict';

var proxy = require('../proxy/middlewares');

module.exports = {
  options: {
    hostname: 'localhost',
    livereload: false,
    port: 8072
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
  test: {
    options: {
      base: 'dist',
      port: 8081
    }
  }
};
