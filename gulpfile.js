"use strict";

var gulp = require("gulp"),
		concat = require("gulp-concat"),
		csso = require("gulp-csso"),
		pug = require("gulp-pug"),
		sass = require("gulp-sass"),
		uglify = require("gulp-uglify"),
		rename = require("gulp-rename"),
		autoprefixer = require("gulp-autoprefixer"),
		sourcemaps = require("gulp-sourcemaps"),
		imagemin = require("gulp-imagemin"),
		notify = require("gulp-notify"),
		useref = require("gulp-useref"),
		gulpIf = require("gulp-if"),
		browserSync = require("browser-sync").create();

/*== Launch the server ==*/
gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "app/"	
		}
	});
		gulp.watch('app/**/*.*').on('change', browserSync.reload)
});

/*== Deleting directories ==*/
gulp.task('clean', function(){
	return del('app');
});

/*== Compiling styles ==*/
gulp.task('styles', function () {
	return gulp.src('dist/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(csso())
		.pipe(rename({suffix: ".min"}))
		.pipe(notify())
		.pipe(gulp.dest('app/style/'))
		.pipe(browserSync.stream());
});

/*== Compiling pug ==*/
gulp.task('views', function(){
	return gulp.src('dist/pug/index.pug')
		.pipe(pug({
				pretty: true
		}))
		.pipe(notify())
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.stream());
});

/*== Minifying images ==*/
gulp.task('images', function(){
	return gulp.src('dist/images/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('app/img/'))
})

/*==Scripts==*/
gulp.task("scripts", function(){
	return gulp.src("dist/js/*.js")
		.pipe(uglify())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest("app/js"));
})


gulp.task('watch', function(){
	gulp.watch("dist/sass/**/*.sass", ["styles"]);
	gulp.watch("dist/pug/**/*.pug", ["views"]);
	gulp.watch("dist/images/**/*.*", ["images"]);
	gulp.watch("dist/js/**/*.js", ["scripts"])
})

gulp.task("default", [ "serve", "watch"])