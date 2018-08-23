var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

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
    return gulp.src('./src/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
});

gulp.task('pug', ['sync', 'sass'], function buildHTML() {
    return gulp.src('src/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['sass', 'pug']);

gulp.task('watch', ['browserSync', 'default'], function () {
    gulp.watch('src/*.scss', ['default']);
    gulp.watch('src/*.pug', ['pug']);
})