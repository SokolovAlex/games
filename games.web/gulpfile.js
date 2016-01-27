var path = require('path');

var gulp = require("gulp"),
    babel = require('gulp-babel'),
    rimraf = require("gulp-rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    stream = require('event-stream'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	size = require('gulp-size'),
    notify = require("gulp-notify"),
    uglify = require("gulp-uglify")

var tankiDest = ['build_gulp/js/tanki.js'];
var watch_src = ['Scripts/**/*.js'];

gulp.task('clean', function() {
    gulp.src(["build_gulp/**/*.js", "build_gulp/**/*.css"], { read: false })
        .pipe(rimraf());
});

var tanki_src = 'Areas/PixiGames/Scripts/Tanki/*.js';

gulp.task("tanki_watch", function (cb) {
    gulp.watch(tanki_src, ['tanki_js']);
});

//gulp.task('tanki_js', function () {
//    return gulp
//        .src(tanki_src)
//        .pipe(babel({
//            presets: ['es2015']
//        }))
//        .pipe(concat("tanki.js"))
//        .pipe(gulp.dest('build_gulp/js'));
//});

gulp.task('tanki_js', function() {
    const modules = browserify('Areas/PixiGames/Scripts/Tanki/start.js')
		.transform(babelify, { presets: ["es2015"] })
		.bundle()
		.on("error", notify.onError({
		    message: 'Browserify error: <%= error.message %>'
		}))
		.pipe(source('tanki.js'))
		.pipe(gulp.dest('build_gulp/js'))
		.pipe(size({
		    title: 'size of modules'
		}));

    const deps = gulp.src(['Scripts/lodash.js'])
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build_gulp/js'))
		.pipe(size({
		    title: 'size of js dependencies'
		}));

    return stream.concat(modules, deps);
});

gulp.task("tanki", ['tanki_js', 'tanki_watch']);

var webserver = require('gulp-webserver');

gulp.task('demo', function() {
	gulp.start("tanki_js");

	gulp.src(['./build_gulp/js/*', './Scripts/pixi_build/pixi.min.js'])
		.pipe(gulp.dest("./demos/js/"));

	gulp.src('./')
		.pipe(webserver({
			livereload: true,
			port: 1111,
			directoryListing: true,
			open: true
		}));
});
