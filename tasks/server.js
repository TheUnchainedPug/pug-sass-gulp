const gulp = require('gulp');
const config = require('./config.js');
const bs = require("browser-sync").create();

gulp.task("serve", function() {
	bs.init({
		server: config.paths.server.toListen
	})
	bs.watch(config.paths.server.toWatch).on("change", bs.reload)
});