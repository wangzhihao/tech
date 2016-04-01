# based on https://github.com/sealtalk/sealtalk-web/blob/master/Gruntfile.coffee
module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    # Task configuration.
    clean:
      build:
        src: [
          './build/*'
          './build/.*'
          './build/*.*'
        ]

    connect:
      build:
        options:
          keepalive: true
          port: 8181 
          base: 'build'
          open: false



    copy:
      build:
        files: [
          {
            expand: true
            cwd: './public'
            src: [
              '**/*.*'
            ]
            dest: './build'
          }
          {
            expand: true
            cwd: './bower_components/font-awesome'
            src: [
              'fonts/**/*.*'
            ]
            dest: './build/'
          }
          {
            expand: true
            cwd: './bower_components/bootstrap/dist'
            src: [
              'fonts/**/*.*'
            ]
            dest: './build/'
          }
        ]

    sass:
      dist:
        options:
          style: 'expanded'
          compass: true
        files:
          './build/stylesheets/style.css' : './public/sass/style.scss'

    concat:
      build:
        files:[
          {
            src:[
              './public/javascripts/app.js'
              './public/javascripts/analytics.js'
              './public/javascripts/services/wordsService.js'
              './public/javascripts/controllers/wordsCtrl.js'
              './public/javascripts/directives/addTooltipDirective.js'
              './public/javascripts/directives/wordsDialogLocalizationDirective.js'
              './public/javascripts/directives/wordTagDirective.js'
              './public/javascripts/directives/highlightNewWordDirective.js'
              './public/javascripts/services/wordSelectionService.js'
              './public/javascripts/services/wordsLocalService.js'
            ]
            dest:'./build/javascripts/main.js'
          }
          {
            src:[
              './build/stylesheets/style.css'
            ]
            dest:'./build/stylesheets/main.css'
          }
        ]

    bower_concat:
      build:
        dest:
          'js': 'build/javascripts/lib.js'
          'css': 'build/stylesheets/lib.css'
        mainFiles:
          'bootstrap': [
            'dist/css/bootstrap.css'
            'dist/js/bootstrap.js'
          ]
          'font-awesome': [
            'css/font-awesome.css'
          ]
        dependencies:
          'angular': 'jquery'

    cssmin:
      release:
        files:[
          {
            src:"./build/stylesheets/main.css"
            dest:"./build/stylesheets/main.css"
          }
          {
            src:"./build/stylesheets/lib.css"
            dest:"./build/stylesheets/lib.css"
          }
        ]

    uglify:
      release:
        files:[
          {
            src:"./build/javascripts/main.js"
            dest:"./build/javascripts/main.js"
          }
          {
            src:"./build/javascripts/lib.js"
            dest:"./build/javascripts/lib.js"
          }
        ]
    

    watch:
      options:
        spawn: false
        livereload: true
      build:
        files: [
          './public/**/*.*'
          './Gruntfile.coffee'
          './bower.json'
          './package.json'
        ]
        tasks: 'build' 

    karma:
      unit:
        configFile: 'karma.conf.coffee'


  # These plugins provide necessary tasks.
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-bower-concat'
  grunt.loadNpmTasks 'grunt-contrib-sass'

  # Build for dev.
  grunt.registerTask 'build', [
    'clean:build'
    'bower_concat:build'
    'sass'
    'concat:build'
    'copy:build'
    #'watch:build'
  ]

  # Build for release.
  grunt.registerTask 'release', [
    'build'
    'cssmin:release'
    'uglify:release'
  ]
