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
		newer = require("gulp-newer"),
		browserSync = require("browser-sync").create();

var tasks = {
	/**
	 * Serving localhost
	 */
	
	serving: function() {
		browserSync.init({
			server: {
				baseDir: "app/"	
			}
		});
		gulp.watch('app/**/*.*').on('change', browserSync.reload)
	},

	/**
	 * Compile styles etc.
	 */
	
	optimizingCss: function() {
		return gulp.src('dist/sass/**/*.sass')
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(csso())
			.pipe(rename({suffix: ".min"}))
			.pipe(notify())
			.pipe(gulp.dest('app/style/'))
			.pipe(browserSync.stream());
	},

	/**
	 * Compile views(pug.js).
	 */
	
	views: function() {
		return gulp.src('dist/pug/index.pug')
			.pipe(pug({
				pretty: true
			}))
			.pipe(useref())
			.pipe(gulpIf('*.js', uglify()))
			.pipe(notify())
			.pipe(gulp.dest('app/'))
			.pipe(browserSync.stream());
	},

	/**
	 * Optimizing images
	 */

	optimizeImages: function() {
		return gulp.src('dist/images/**/*.*')
			.pipe(newer("app/img/"))
			.pipe(imagemin())
			.pipe(gulp.dest('app/img/'))
	},

	/**
	 * Minifying scripts
	 */
	
	uglifyingJs: function() {
		return gulp.src("dist/js/*.js")
			.pipe(uglify())
			.pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest("app/js"));
	},

	/**
	 * Watcher
	 */
	
	watching: function() {
		gulp.watch("dist/sass/**/*.sass", ["styles"]);
		gulp.watch("dist/pug/**/*.pug", ["views"]);
		gulp.watch("dist/images/**/*.*", ["images"]);
		gulp.watch("dist/js/**/*.js", ["scripts"])
	}
};


/**
 * TASKS ARE BEING CALLED
 */
gulp.task('serve', tasks.serving());
gulp.task('styles', tasks.optimizingCss);
gulp.task('views', tasks.views);
gulp.task('images', tasks.optimizeImages);
gulp.task("scripts", tasks.uglifyingJs);
gulp.task('watch', tasks.watching);

/*Default task*/
gulp.task("default", ["serve", "watch"]);