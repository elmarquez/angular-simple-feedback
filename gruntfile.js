var nopt = require('nopt'), path = require('path');

// grunt console options
var knownOptions = {
  increment: String,    // increment version by type: major, minor, patch, prerelease
  instrument: Boolean,  // instrument distribution for test coverage analysis
  mock: Boolean,        // use mocked service API
  selenium: String        // selenium server
};

module.exports = function (grunt) {
  'use strict';
  // Load the Grunt task definitions and configurations from the /conf/grunt
  // folder.
  require('load-grunt-config')(grunt, {
    init: true,
    configPath: path.join(process.cwd(), 'conf', 'grunt'),
    loadGruntTasks: {
      pattern: 'grunt-*',
      config: require('./package.json'),
      scope: 'devDependencies'
    }
  });

  // Parse command line arguments. Grunt doesn't handle --options correctly so
  // we will parse them with nopt instead.
  var options = nopt(knownOptions, {}, process.argv, 2);

  // Increment version identifier by semver type.
  grunt.config.set('increment', options.increment || 'patch');

  // Instrumentation. Add instrumentation to Angular application modules to
  // enable test coverage analysis.
  grunt.config.set('instrument', options.instrument || false);

  // Service and data mocks. Configure the application to use mocked services
  // and data rather than a deployed API.
  grunt.config.set('mock', options.mock || false);

  // Console options.
  grunt.config.set('options', options);

  // Package info
  grunt.config.set('pkg', grunt.file.readJSON('package.json'));
  
  // Recaptcha code
  if (options.recaptcha) {
    grunt.config.set('recaptcha', options.recaptcha);
  }

  // Selenium server. Specifies the name of the Protractor configuration file
  // to be loaded when running the functional test suite. Configuration files
  // are located in conf/protractor.
  grunt.config.set('selenium', options.selenium || 'localhost');
};
