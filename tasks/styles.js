const gulp = require('gulp');
const config = require('./config.js');
const $ = require('gulp-load-plugins')();

gulp.task("compile:styles", function() {
	return gulp.src(config.paths.src.styles)
		.pipe($.plumber())
		.pipe($.sass())
		.pipe($.autoprefixer({
            browsers: ['last 4 versions'],
        }))	
		.pipe($.csso())
		.pipe($.rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(config.paths.dist.styles))
		.pipe($.notify( { title: 'Compile:styles', message: 'Compile:styles task completed' } ))
});