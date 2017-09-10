"use strict"; 
var path = require('path'); 
var gulp = require('gulp');
var connect = require('gulp-connect');  // run a local server
var open = require('gulp-open');  // open a url in web browser
var livereload = require('gulp-livereload'); 

var config = {
	port:9005, 
	devBaseUrl:'http://localhost', 
	paths:{ 
		src: 'src',
		dist: './dist'
	}
};

// start a local dev server
gulp.task('connect', function(){
	connect.server({
		root: ['dist'],
		port: config.port, 
		base: config.devBaseUrl,
		livereload: true
	})
});

gulp.task('open', ['connect'], function(){
	gulp.src('dist/index.html')
	.pipe(open({
		uri: config.devBaseUrl + ":" + config.port + "/" 
	})); 
}); 

gulp.task('source', function(){  
	return gulp.src(path.join(config.paths.src, "*.html"))
	.pipe(gulp.dest(config.paths.dist))
	.pipe(livereload());
});  
 
gulp.task('watch', function(){ 
	livereload.listen();
	gulp.watch(path.join(config.paths.src, "*.html"), ['source']);
});
 

gulp.task('default',['source','open', 'watch']); 


function isOnlyChange(event) {
  return event.type === 'changed';
}