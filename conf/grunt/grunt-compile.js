module.exports = function (grunt) {
  grunt.registerTask('compile', 'Compile a distributable library in /dist.',
    function () {
      grunt.task.run(['jshint','clean','copy','uglify','cssmin','template']);
    }
  );
};
