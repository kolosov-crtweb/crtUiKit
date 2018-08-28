var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'dist/'
        },
        notify: false
    })
});

gulp.task('sync', function (cb) {
    setTimeout(function () {
        cb();
    }, 1000);
});

gulp.task('sass', function () {
    return gulp.src('src/assets/styles/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(plumber())
        .pipe(autoprefixer())
        .pipe(cssnano({
            zindex: false
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('pug', ['sync', 'sass'], function buildHTML() {
    return gulp.src('src/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('default', ['sass', 'pug']);

gulp.task('watch', ['browserSync', 'default'], function () {
    gulp.watch('src/assets/styles/**/*.scss', ['default']);
    gulp.watch('src/*.pug', ['pug']);
})