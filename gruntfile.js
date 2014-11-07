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
	// build
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
	// tasks
	grunt.registerTask('build', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('default', ['watch']);
};
