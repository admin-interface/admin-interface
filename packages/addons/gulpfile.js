const gulp        = require('gulp');
const babel       = require('gulp-babel');
const rename      = require('gulp-rename');
const changed     = require('gulp-changed');
const del         = require('del');
const runSequence = require('run-sequence');

const config = {
    path: {
        build: {
            js: 'dist',
            copy: 'dist'
        },
        src: {
            js: 'src/**/*.js',
            copy: 'src/**/*.{yaml,yml,jade}'
        },
        watch: {
            js: 'src/**/*.js',
            copy: 'src/**/*.{yaml,yml,jade}'
        },
        clear: 'dist'
    }
};

gulp.task('clear', () =>
    del(config.path.clear));

gulp.task('build:js', () =>
    gulp.src(config.path.src.js)
        .pipe(changed(config.path.build.js))
        .pipe(babel())
        .pipe(gulp.dest(config.path.build.js)));

gulp.task('build:flow', () =>
    gulp.src(config.path.src.js)
        .pipe(changed(config.path.build.js))
        .pipe(rename({ extname: '.js.flow' }))
        .pipe(gulp.dest(config.path.build.js)));

gulp.task('watch:js', () =>
    gulp.watch(config.path.watch.js, [ 'build:js', 'build:flow' ]));

gulp.task('copy', () =>
    gulp.src(config.path.src.copy)
        .pipe(gulp.dest(config.path.build.copy)));

gulp.task('build', () =>
    runSequence('clear', [ 'build:js', 'build:flow', 'copy' ]));

gulp.task('watch', () =>
    runSequence('build', [ 'watch:js' ]));
