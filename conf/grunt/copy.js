module.exports = {
  dist: {
    cwd: 'src/www',
    src: [ '**/*'],
    dest: 'dist',
    expand: true
  },
  instrumented: {
    cwd: 'dist',
    src: [ 'dist/instrumented/**/*.js' ],
    dest: 'dist/app',
    expand: true
  },
  vendor: {
    cwd: 'vendor',
    src: [ '**/*', '!**/src/**/*', '!**/test/**/*' ],
    dest: 'dist/vendor',
    expand: true
  }
};
