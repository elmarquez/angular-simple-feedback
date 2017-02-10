module.exports = function (grunt) {
  grunt.registerTask('release', 'Release a new application version',
    function () {
      grunt.task.run(['compile','test','gitadd','gitcommit']);
    }
  );
};
