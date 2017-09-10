"use strict"; 
var path = require('path'); 
var gulp = require('gulp');
var connect = require('gulp-connect');  // run a local server
var open = require('gulp-open');  // open a url in web browser
var livereload = require('gulp-livereload'); 

var browserify = require('browserify');     // Bundles js
var reactify = require('reactify');         // Transforms React JSX to JS
var source = require('vinyl-source-stream');  // Use conventional text streams with Gulp 
var concat = require('gulp-concat'); 
var lint = require('gulp-eslint');    // Lint JS files, including JSX


var config = {
	port:9005, 
	devBaseUrl:'http://localhost', 
	paths:{ 
		src: 'src',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [ 
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
		],  
		dist: './dist',
		mainJs: 'src/main.js'
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

gulp.task('html', function(){  
	return gulp.src(path.join(config.paths.src, "*.html"))
	.pipe(gulp.dest(config.paths.dist))
	.pipe(livereload());
});  

gulp.task('js', function(){
	browserify(path.join(config.paths.src, "main.js"))
	.transform(reactify)
	.bundle()
	.on('error', console.error.bind(console))
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(config.paths.dist + "/scripts"))
	.pipe(livereload())
});
 
gulp.task('css', function(){
	gulp.src(config.paths.css)
	.pipe(concat('bundle.css'))
	.pipe(gulp.dest(config.paths.dist + "/css")); 
});

gulp.task('watch', function(){ 
	livereload.listen();
	gulp.watch(path.join(config.paths.src, "*.html"), ['html']);
	gulp.watch(path.join(config.paths.src, "main.js"), ['js', 'lint']);
	gulp.watch(path.join(config.paths.js, "js"), ['js', 'lint']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({configFile: 'eslint.config.json'}))
		.pipe(lint.format())
		.pipe(lint.failAfterError());
}); 

gulp.task('images', function(){
	gulp.src(config.paths.images)
	.pipe(gulp.dest(config.paths.dist + '/images'))
	.pipe(livereload());
});

gulp.task('default',['html', 'images', 'js', 'css', 'lint', 'open', 'watch']); 


function isOnlyChange(event) {
  return event.type === 'changed';
}