var gulp = require('gulp'),
	 concatCss = require('gulp-concat-css'),
	 cleanCss = require('gulp-clean-css'),
	 htmlIncluder = require('gulp-htmlincluder'),
	 connect = require('gulp-connect'),
	 replace = require('gulp-html-replace'),
	 autoprefixer = require('gulp-autoprefixer')
	 livereload = require('livereload');

gulp.task('concat', function(){
	gulp.src('./dev/css/**/*.css')
		.pipe(concatCss('style.css'))
		.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
		 }))
		.pipe(cleanCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('./build/css/'))
		.pipe(connect.reload());
});

gulp.task('html', function() {
	 gulp.src('./dev/**/*.html')
		.pipe(htmlIncluder())
		.pipe(replace({
			'css': './css/style.css'
		}))
		.pipe(gulp.dest('./build/'))
		.pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		root: './build/',
		livereload: true
	});
});

gulp.task('default', function(){
	gulp.start('connect', 'html', 'concat');

	gulp.watch(['./dev/**/*.html'], function(event){
		gulp.start('html');
	});

	gulp.watch(['./dev/css/**/*.css'], function(event){
		gulp.start('concat');
	});
});