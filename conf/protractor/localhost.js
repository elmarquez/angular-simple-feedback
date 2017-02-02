/**
 * Execute test suite against local Selenium host and application deployment.
 */
module.exports.config = {
  allScriptsTimeout: 11000,
  baseUrl: 'http://localhost:8081',
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showColors: true,
    silent: true
  },
  onPrepare: function () {
    require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('target/junit', true, true));
    // Spec report
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStackTrace: true}));
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../../test/functional/**/*.spec.js']
};
