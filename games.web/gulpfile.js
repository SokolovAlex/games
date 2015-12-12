var path = require('path');

var gulp = require("gulp"),
    babel = require('gulp-babel'),
    rimraf = require("gulp-rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    gutil = require('gulp-util'),
    notify = require("gulp-notify"),
    uglify = require("gulp-uglify");

var tankiDest = ['build_gulp/js/tanki.js'];
var watch_src = ['Scripts/**/*.js'];

gulp.task('clean', function() {
    gulp.src(["build_gulp/**/*.js", "build_gulp/**/*.css"], { read: false })
        .pipe(rimraf());
});

//gulp.task('scripts', () => {
//    return browserify('source/js/app.js', {
//			debug: env === "development" ? true : false
//		})
//		.transform(babelify, { presets: ["es2015", "react"] })
//		.bundle()
//		.on("error", notify.onError({
//		    message: 'Browserify error: <%= error.message %>'
//		}))
//		.pipe(source('application.js'))
//		.pipe(gulp.dest('js'))
//		.pipe(size({
//		    title: 'size of modules'
//		}))
//		.pipe(browserSync.reload({ stream: true, once: true }));
//});

gulp.task("watch", function (cb) {
    gulp.watch(watch_src, ['browserify']);
});

gulp.task('es6', function () {
    return gulp.src('examples/scripts_es6/Application.js')
        .pipe(babel())
        .pipe(gulp.dest('build/es6'));
});

gulp.task('tanki', function () {
    return gulp
        .src('Areas/PixiGames/Scripts/Tanki/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build_gulp/js'));
});

gulp.task("build", ['clean', 'browserify', 'watch']);
