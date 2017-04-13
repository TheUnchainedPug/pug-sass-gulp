const gulp = require('gulp');
const config = require('./config.js');
const $ = require('gulp-load-plugins')();

gulp.task("copy:fonts", function() {
	return gulp.src(config.paths.src.fonts)
		.pipe($.newer(config.paths.dist.fonts))
		.pipe(gulp.dest(config.paths.dist.fonts))
});