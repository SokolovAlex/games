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

var tanki_src = 'Areas/PixiGames/Scripts/Tanki/*.js';

gulp.task("tanki_watch", function (cb) {
    gulp.watch(tanki_src, ['tanki_js']);
});

gulp.task('tanki_js', function () {
    return gulp
        .src(tanki_src)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat("tanki.js"))
        .pipe(gulp.dest('build_gulp/js'));
});

gulp.task("tanki", ['tanki_js', 'tanki_watch']);
