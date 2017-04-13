const gulp = require('gulp');
const config = require('./config.js');
const $ = require('gulp-load-plugins')();
const emitty = require('emitty').setup('source', 'pug');


gulp.task('compile:views',function() {
	return new Promise((resolve, reject) => {
		emitty.scan(global.emittyChangedFile).then(() => {
			gulp.src(config.paths.src.views)
				.pipe($.if(global.watch, emitty.filter(global.emittyChangedFile)))
				.pipe($.pug({ pretty: true }))
				.pipe(gulp.dest(config.paths.dest.views))
				.on('end', resolve)
				.on('error', reject);
		});
	})
});

