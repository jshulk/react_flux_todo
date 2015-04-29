module.exports = function (grunt) {
	

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dev: {
				files: {
					'dist/app.js': ['src/app.js']
				},
				options: {
					transform: [
						'babelify', 'reactify'
					]
				},
			}
		},
		watch: {
			src: {
				files: ['src/**/*.js', 'src/**/*.jsx', '!source/build/app.js'],
				tasks: ['browserify:dev'],
				options: {
					livereload: true
				}
			}
		},
		connect: {
			dev: {
				options: {
					hostname: 'localhost',
					port: 3000,
					base: "dist"
				}
			}
		},
		copy: {
			dist: {
				files: [
					{expand: false, src: 'index.html', dest : 'dist/'},
					{expand: true, src: 'css/**/*.*', dest: 'dist/'}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('start:dev', ['browserify', 'copy:dist', 'connect', 'watch']);

	grunt.registerTask('default', 'browserify');
};