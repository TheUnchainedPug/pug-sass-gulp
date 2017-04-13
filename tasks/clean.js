const gulp = require('gulp');
const config = require('./config.js');
const del = require('del');

gulp.task("clean", function(){
	return(del(config.paths.dist.clean));
});