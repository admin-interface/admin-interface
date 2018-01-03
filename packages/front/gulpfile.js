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
            scss: 'dist/scss',
            copy: 'dist'
        },
        src: {
            scss: 'src/scss/style.scss',
            copy: 'src/{images,js}/**/*'
        },
        watch: {
            scss: 'src/**/*.scss',
            copy: 'src/{images,js}/**/*'
        },
        clear: 'dist'
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

gulp.task('copy', () =>
    gulp.src(config.path.src.copy)
        .pipe(gulp.dest(config.path.build.copy)));

gulp.task('build', () =>
    runSequence('clear', [ 'build:scss', 'bower:install', 'copy' ]));

gulp.task('watch', () =>
    runSequence('build', [ 'watch:scss' ]));
