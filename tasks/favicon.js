const gulp = require('gulp');
const config = require('./config.js');
const $ = require('gulp-load-plugins')();

gulp.task("copy:favicon", function() {
	return gulp.src(config.paths.src.favicon)
		.pipe(gulp.dest(config.paths.dist.favicon))
});