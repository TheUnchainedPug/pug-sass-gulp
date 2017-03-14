"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();
const pug = require("gulp-pug");
const useref = require("gulp-useref");
const gulpIf = require("gulp-if");
const del = require("del");
const newer = require("gulp-newer");
const cached = require("gulp-cached");
const debug = require("gulp-debug");
const bs = require("browser-sync").create();


gulp.task("clean", function(){
	return(del('build'));
});

gulp.task("compile:styles", function() {
	return gulp.src("source/sass/application.sass")
		.pipe(plumber())
		.pipe(sass()).on("error", notify.onError(function(err){
			return {
				title: "Styles",
				message: err.message
			}
		}))
		.pipe(debug({
			title: "Styles are compiled: "
		}))
		.pipe(autoprefixer({
            browsers: ['last 4 versions'],
        }))	
		.pipe(csso())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(notify())
		.pipe(gulp.dest("build/style"))
});

gulp.task("compile:views", function() {
	return gulp.src("source/pug/*.pug")
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.on("error", notify.onError(function(err){
			return {
				title: "Views",
				message: "The error is" + err.message
			}
		}))
		.pipe(useref())
		.pipe(gulpIf("*.js", uglify()))
		.pipe(notify())
		.pipe(gulp.dest("build/"))
});

gulp.task("compress:images", function() {
	return gulp.src("source/img/**/*.*")
		.pipe(newer("build/img"))
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(debug({
			title: "Images are compressed: "
		}))
		.pipe(gulp.dest("build/img"))
});

gulp.task("copy:favicon", function() {
	return gulp.src("source/favicon.ico")
		.pipe(gulp.dest("build/"))
});

gulp.task("copy:fonts", function() {
	return gulp.src("source/fonts/**")
		.pipe(newer("build/fonts"))
		.pipe(debug({
			title: "Fonts are copied: "
		}))
		.pipe(gulp.dest("build/fonts"))
});

gulp.task("build", gulp.series(
	"clean",
	gulp.parallel("compile:styles", "compile:views", "copy:favicon", "compress:images", "copy:fonts"))
);

gulp.task("watch", function() {
	gulp.watch("source/sass/**/*.*", gulp.series("compile:styles"));
	gulp.watch("source/img/**/*.*", gulp.series("compress:images"));
	gulp.watch("source/fonts/**/*.*", gulp.series("copy:fonts"));
	gulp.watch("source/pug/**/*.*", gulp.series("compile:views"));
});

gulp.task("serve", function() {
	bs.init({
		server: "build"
	})

	bs.watch("build/**/*.*").on("change", bs.reload)
});

gulp.task("dev",
	gulp.series("build", gulp.parallel("watch", "serve"))
);
