module.exports = {
  dist: {
    cwd: 'dist',
    expand: true,
    files: {
      'dist/angular-simple-feedback.min.js': 'dist/angular-simple-feedback.js'
    }
  },
  options: {
    banner: '/* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>. Compiled <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */\n',
    mangle: false,
    screwIE8: true,
    sourceMap: true
  }
};
