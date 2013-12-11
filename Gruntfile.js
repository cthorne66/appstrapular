/**
 * all paths point to to the TARGET directory, because that is that path
 * generated by maven and those files are used to create web-resources.jar
 **/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		SRC_PATH: './web/public/',
		BUILD_PATH: './web/target/',

		/**
		 * Used to remove files or directories
		 */
		clean: {
			target: ['<%= BUILD_PATH %>'], //build files
		},

		/**
		 * Used to copy files or directories
		 */
		copy: {
			target: {
				files: [{ // Copy source into build folder for further manipulation
					expand: true,
					cwd: '<%= SRC_PATH %>',
					src: ['**'],
					dest: '<%= BUILD_PATH %>'
				}]
			}
		},

		/**
		 * Used to minify css files, and takes any @import references and concats the into that same file
		 */
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= SRC_PATH %>' + 'css/',
					src: ['*.css'],
					dest: '<%= BUILD_PATH %>' + 'css/'
				}]
			}
		},

		/**
		 * Used to minify javascript files or directories.
		 * By not specifying a destination directory, it will overwrite the source file
		 */
		uglify: {
			target: {
				files: [{
					expand: true,
					src: '<%= BUILD_PATH %>' + 'js/**/*.js'
				}]
			}
		},


		/**
		 * The RequireJS plugin that will use uglify2 to build and minify our
		 * JavaScript, templates and any other data we include in the require files.
		 */
		requirejs: {
			compile: {
				options: {
					appDir: '<%= SRC_PATH %>',
					baseUrl: 'js', // Path of source scripts, relative to this build file
					mainConfigFile: '<%= SRC_PATH %>' + 'buildConfig.js', // Path of shared configuration file, relative to this build file
					dir: '<%= BUILD_PATH %>',
					// name: 'main',                                                   // Name of input script (.js extension inferred)
					// name: '../apps/mv/mv', // Name of input script (.js extension inferred)
					// out: '<%= BUILD_PATH %>' + 'js/main.min.js', // Path of built script output
					//fileExclusionRegExp: /router/, // Ignore all files matching this pattern
					keepBuildDir: true,
					useStrict: true,
					preserveLicenseComments: false,
					findNestedDependencies: true,
					// generateSourceMaps: true,
					inlineText: true,
					// stubModules: ['cache'],
					pragmas: {
						debugExclude: true
					},

					modules: [],



					optimize: 'uglify2', // Use 'none' If you do not want to uglify.
					uglify2: {
						output: {
							beautify: false,
							comments: false
						},
						compress: {
							sequences: false,
							global_defs: {
								DEBUG: false
							}
						},
						warnings: false,
						mangle: true
					}
				}
			}
		},

		jshint: {
			all: ['<%= SRC_PATH %>' + '**/*.js'],
			options: {
				reporter: 'jslint',
				reporterOutput: 'hintresults.xml',
				force: true, //to not fail the task if errors are encoutered
				ignores: [
					'<%= SRC_PATH %>' + 'lib/**/*.js'
				],
				// '-W099': true, //ignore mixed tabs and spaces error
				// '-W041': true //ignore !== and === errors
			}
		},

		karma: {
		  unit: {
		    configFile: './test/karma.config.js',
		    autoWatch: true
		  }
		}

		// copyProdFiles: function() {
		// 	grunt.log.write('hello, world');
		// }
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin'); //css minification plugin
	grunt.loadNpmTasks('grunt-contrib-htmlmin'); //HTML minification plugin
	grunt.loadNpmTasks('grunt-contrib-uglify'); //JS minification
	grunt.loadNpmTasks('grunt-contrib-requirejs'); //RequireJS optimization
	grunt.loadNpmTasks('grunt-contrib-clean'); //empty directory contents
	grunt.loadNpmTasks('grunt-contrib-copy'); //copy directory contents
	grunt.loadNpmTasks('grunt-contrib-concat'); //create bundles
	grunt.loadNpmTasks('grunt-contrib-jshint'); //for hinting code quality
	grunt.loadNpmTasks('grunt-karma');

	// Default task.
	grunt.registerTask('default', 'copy files', function() {
		grunt.log.writeln('\nThese are your options:\n');
		grunt.log.writeln('optimize  <------- minifies css/js\n');
	});

	grunt.registerTask('optimize', 'Static file optimization process', function() {
		grunt.log.writeln('cleaning build target ***TASK***');
		grunt.task.run(['clean:target']);

		grunt.log.writeln('copying files to build target ***TASK***');
		// grunt.task.run(['copy:ecoFiles']);
		grunt.task.run(['copy:target']);

		grunt.log.writeln('optimizing files ***TASK***');
		grunt.task.run(['cssmin', 'requirejs', 'uglify']);
	});

	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('karmatest', ['karma']);
};