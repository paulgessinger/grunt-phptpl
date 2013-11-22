/*
 * grunt-phptpl
 * https://github.com/paulgessinger/grunt-phptpl
 *
 * Copyright (c) 2013 Paul Gessinger
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
	phptpl: {
		single: {
			options: {
			},
			files: {
				'tmp/single.html': ['test/fixtures/single.php'],
			}
		},
		
		multiple_concat: {
			options: {
			},
			files: {
				'tmp/multiple.html': ['test/fixtures/single.php', 'test/fixtures/single2.php']
			}
		},
		
		multiple_separate: {
			options: {
			},
			files: {
				'tmp/multiple_separate/': ['test/fixtures/single.php', 'test/fixtures/single2.php']
			}
		},
		
		multiple_pattern_concat: {
			options: {
			},
			files: {
				'tmp/multiple_pattern_concat.html': ['test/fixtures/**/*.php']
			}
		},
		
		multiple_pattern_separate_hierarchy: {
			files: [
				{
					cwd: 'test/fixtures',
					src: '**/*.php',
					dest: 'tmp/multiple_pattern_separate_hierarchy/',
					ext:'.html',
					flatten:false
				}
			]
		},
		
		multiple_pattern_separate_flat: {
			files: [
				{
					cwd: 'test/fixtures',
					src: '**/*.php',
					dest: 'tmp/multiple_pattern_separate_flat/',
					ext:'.html',
					flatten:true
				}
			]
		},
	
		multiple_expand_separate: {
			files: [
				{
					expand:true,
					cwd: 'test/fixtures',
					src: '**/*.php',
					dest: 'tmp/multiple_expand_separate',
					ext:'.html',
					flatten:false
				}
			]
		}
    },

    // Unit tests.
    nodeunit: {
		tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'phptpl', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
