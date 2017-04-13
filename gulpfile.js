"use strict";

const gulp = require("gulp");
const config = require('./tasks/config.js');
const reqDir = require('require-dir');
reqDir('./tasks', { recurse: true });

// Build
gulp.task("build", gulp.series(
	"clean",
	gulp.parallel("compile:views", "compile:styles", "copy:favicon", "compress:images", "copy:fonts"))
);

// Watcher
gulp.task("watch", function() {
	global.watch = true;

	gulp.watch(config.paths.watch.styles, gulp.series("compile:styles"));
	gulp.watch(config.paths.watch.image, gulp.series("compress:images"));
	gulp.watch(config.paths.watch.fonts, gulp.series("copy:fonts"));
	gulp.watch(config.paths.watch.views, gulp.series("compile:views"))
		.on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
		});
	gulp.watch(config.paths.watch.scripts, gulp.series("scripts"));
});

// RUN THIS TASK AS A DEFAULT
gulp.task("dev",
	gulp.series("build", gulp.parallel("watch", "serve"))
);
