const gulp = require('gulp');
const config = require('./config.js');
const $ = require('gulp-load-plugins')();

gulp.task('scripts', function() {
	return gulp.src(config.paths.src.scripts)
		.pipe($.plumber())
		.pipe($.concat('application.js'))
		.pipe($.uglify())
		.pipe($.rename( { suffix: '.min' } ))
		.pipe(gulp.dest(config.paths.dist.scripts))
})