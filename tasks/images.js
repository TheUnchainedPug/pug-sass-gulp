const gulp = require('gulp');
const config = require('./config.js');
const $ = require('gulp-load-plugins')();

gulp.task("compress:images", function() {
	return gulp.src(config.paths.src.images)
		.pipe($.newer(config.paths.dist.images))
		.pipe($.imagemin({
			progressive: true
		}))
		.pipe(gulp.dest(config.paths.dist.images))
});