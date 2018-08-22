var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');

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

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('pug:watch', function () {
    gulp.watch('./sass/**/*.pug', ['pug']);
});


gulp.task('pug', ['sync', 'sass'], function buildHTML() {
    return gulp.src('src/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('default', ['sass', 'pug']);