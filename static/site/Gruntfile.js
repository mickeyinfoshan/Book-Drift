module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    react: {
      combined_file_output: {
      files: {
        'js/bookdriftComponents.js': [
          "components/*.jsx",          
        ]
      }
    },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> author:Mickey */\n'
      },
      build: {
        src: 'js/bookdriftComponents.js',
        dest: 'js/bookdriftComponents.min.js'
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-react');
  // Default task(s).
  grunt.registerTask('default', ['react','uglify']);

};