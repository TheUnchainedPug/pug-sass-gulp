module.exports = {
	paths: {
		src: {
			styles: 'source/sass/application.sass',
			views: 'source/pug/*.pug',
			scripts: 'source/js/**/*.js',
			images: 'source/img/**/*.*',
			fonts: 'source/fonts/**',
			favicon: 'source/favicon.ico'
		},

		dist: {
			styles: 'build/style',
			views: 'build/',
			scripts: 'build/js',
			images: 'build/img',
			fonts: 'build/fonts',
			favicon: 'build/',
			clean: 'build/'
		},

		server: {
			toListen: 'build/',
			toWatch: 'build/**/*.*'
		},

		watch: {
			styles: 'source/sass/**/*.*',
			images: 'source/img/**/*.*',
			fonts: 'source/fonts/**/*.*',
			views: 'source/pug/**/*.*',
			scripts: 'source/js/**/*.js',
		}
	}
}
