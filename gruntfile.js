module.exports = function(grunt) {
	'use strict';
	require('load-grunt-tasks')(grunt);
	// config
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		banner: '/**\n' +
			'* <%= pkg.title || pkg.name %> <%= pkg.version %> <<%= pkg.homepage %>>\n' +
			'* Copyright 2009-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.url %>>\n' +
			'* License <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n' +
			'*/\n'
	});
	// build (default)
	grunt.config.merge({
		jshint: {
			dist: ['gruntfile.js', '<%= pkg.name %>.js']
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '<%= banner %>'
			},
			dist: {
				files: [
					{
						src: '<%= pkg.name %>.js',
						dest: '<%= pkg.name %>.js'
					},
					{
						src: '<%= pkg.name %>.js',
						dest: 'dist/<%= pkg.name %>.js'
					}
				]
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				files: [
					{
						src: '<%= pkg.name %>.js',
						dest: '<%= pkg.name %>.min.js'
					},
					{
						src: '<%= pkg.name %>.js',
						dest: 'dist/<%= pkg.name %>.min.js'
					}
				]
			}
		}
	});
	// test
	grunt.config.merge({
		connect: {
			server: {
				options: {
					hostname: "localhost"
				}
			}
		},
		'saucelabs-qunit': {
			test: {
				options: {
					urls: ["http://localhost:8000/test/index.html"],
					build: 'v<%= pkg.version %>',
					sauceConfig: { // seconds
						'max-duration': 90
					},
					browsers: [
						{
							browserName: "safari",
							platform: "OS X 10.9"
						},
						{
							browserName: "firefox",
							platform: "OS X 10.9"
						},
						{
							browserName: "chrome",
							platform: "OS X 10.9"
						},
						{
							browserName: "firefox",
							platform: "WIN8"
						},
						{
							browserName: "chrome",
							platform: "WIN8"
						},
						{
							browserName: "internet explorer",
							platform: "WIN8.1",
							version: "11"
						},
						{
							browserName: "internet explorer",
							platform: "WIN8",
							version: "10"
						},
						{
							browserName: "internet explorer",
							platform: "VISTA",
							version: "9"
						},
						{
							browserName: "internet explorer",
							platform: "XP",
							version: "8"
						},
						{
							browserName: "internet explorer",
							platform: "XP",
							version: "7"
						},
						{
							browserName: "internet explorer",
							platform: "XP",
							version: "6"
						}
					],
					testname: "imgpreload",
					tags: ["master"]
				}
			}
		}
	});
	// tasks
	grunt.registerTask("test", ["connect", "saucelabs-qunit"]);
	grunt.registerTask('build', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('default', ['build']);
};
