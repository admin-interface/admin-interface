const gulp        = require('gulp');
const sass        = require('gulp-sass');
const mincss      = require('gulp-minify-css');
const postcss     = require('gulp-postcss');
const runSequence = require('run-sequence');
const del         = require('del');
const bower       = require('gulp-bower');

const config = {
    path: {
        build: {
            scss: 'static/scss'
        },
        src: {
            scss: 'src/scss/style.scss'
        },
        watch: {
            scss: 'src/**/*.scss'
        },
        clear: 'static/scss'
    }
};

gulp.task('clear', () =>
    del(config.path.clear));

gulp.task('build:scss', () =>
    gulp.src(config.path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss())
        .pipe(mincss())
        .pipe(gulp.dest(config.path.build.scss)));

gulp.task('watch:scss', () =>
    gulp.watch(config.path.watch.scss, [ 'build:scss' ]));

gulp.task('bower:install', () => 
    bower({ cmd: 'install' }));

gulp.task('build', () =>
    runSequence('clear', [ 'build:scss', 'bower:install' ]));

gulp.task('watch', () =>
    runSequence('build', [ 'watch:scss' ]));
