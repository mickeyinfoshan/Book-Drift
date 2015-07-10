module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    react: {
      combined_file_output: {
      files: {
        'js/wenba.js': [
          "components/AskForm.js",
          "components/AnswerForm.js",
          "components/LoginModal.js",
          "components/RegisterModal.js",
          "components/Question.js",
          "components/QuestionList.js",
          "components/Answer.js",
          "components/AnswerList.js",
          "components/QuestionDetail.js",
          "components/AnswerHistory.js",
          "components/QuestionHistory.js",
          "components/QuestionListView.js",
          "components/QuestionDetailView.js",
          "components/AnswerHistoryView.js",
          "components/QuestionHistoryView.js",
          "components/View.js",
          "js/init.js"
        ]
      }
    },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> author:Mickey */\n'
      },
      build: {
        src: 'js/wenba.js',
        dest: 'js/wenba.min.js'
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-react');
  // Default task(s).
  grunt.registerTask('default', ['react','uglify']);

};