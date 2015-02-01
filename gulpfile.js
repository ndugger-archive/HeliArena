var gulp = require('gulp');
var six2five = require('gulp-6to5');
var browserify = require('gulp-browserify');

gulp.task('six2five', function() {
	gulp.src('./src/*.js')
		.pipe(six2five())
		.pipe(gulp.dest('./build/es5'));
});

gulp.task('browserify', ['six2five'], function() {
	gulp.src('./build/es5/game.js')
		.pipe(browserify())
		.pipe(gulp.dest('./build'));
})

gulp.task('default', ['browserify'], function() {
	gulp.watch('./src/*.js', ['browserify']);
});