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
		.pipe(autoprefixer())	
		.pipe(csso())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(notify())
		.pipe(gulp.dest("build/style"))
});

gulp.task("compile:views", function() {
	return gulp.src("source/pug/index.pug")
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


gulp.task("assets", function() {
	return gulp.src("source/assets/**", {since: gulp.lastRun('assets')})
		.pipe(newer("build"))
		.pipe(gulp.dest("build/"))
});

gulp.task("build", gulp.series(
	"clean",
	gulp.parallel("compile:styles", "compile:views", "assets"))
);

gulp.task("watch", function() {
	gulp.watch("source/sass/**/*.*", gulp.series("compile:styles"))
	gulp.watch("source/assets/**/*.*", gulp.series("assets"))
	gulp.watch("source/pug/**/*.*", gulp.series("compile:views"))
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
