const gulp     = require('gulp');
const plumber  = require("gulp-plumber");
const through  = require("through2");
const chalk    = require("chalk");
const gutil    = require("gulp-util");
const newer    = require("gulp-newer");
const babel    = require("gulp-babel");
const merge    = require("merge-stream");
const path     = require('path');
const sass     = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const mincss   = require('gulp-minify-css');

const config = {
    sources: [ 'packages' ]
};

function getGlobFromSource(source) {
    return `./${source}/*/src/**/*.js`;
}

function getOtherFilesForCopy(source) {
    return `./${source}/*/src/**/*.{jade,yaml}`;
}

function getSCSSFromCourse(source) {
    return `./${source}/*/src/scss/style.scss`;
}

function swapSrcWithLib(srcPath) {
    const parts = srcPath.split(path.sep);
    parts[ 1 ]  = "dist";
    return parts.join(path.sep);
}

function swapSrcWithStatic(srcPath) {
    const parts = srcPath.split(path.sep);
    parts[ 1 ]  = "static";
    return parts.join(path.sep);
}

gulp.task('build:js', () => merge(config.sources.map(source => {
        const base = path.join(__dirname, source);
        return gulp.src(getGlobFromSource(source), { base: base })
            .pipe(plumber({
                errorHandler: err => {
                    gutil.log(err.stack);
                }
            }))
            .pipe(newer({
                dest: base,
                map:  swapSrcWithLib
            }))
            .pipe(through.obj((file, enc, callback) => {
                gutil.log("Compiling", "'" + chalk.cyan(file.relative) + "'...");
                callback(null, file);
            }))
            .pipe(babel())
            .pipe(
                through.obj((file, enc, callback) => {
                    // Passing 'file.relative' because newer() above uses a relative
                    // path and this keeps it consistent.
                    file.path = path.resolve(file.base, swapSrcWithLib(file.relative));
                    callback(null, file);
                })
            )
            .pipe(gulp.dest(base));
    }))
);

gulp.task('copy', () => merge(config.sources.map(source => {
        const base = path.join(__dirname, source);
        return gulp.src(getOtherFilesForCopy(source), { base: base })
            .pipe(newer({
                dest: base,
                map:  swapSrcWithLib
            }))
            .pipe(through.obj((file, enc, callback) => {
                gutil.log("Copy", "'" + chalk.cyan(file.relative) + "'...");
                callback(null, file);
            }))
            .pipe(
                through.obj((file, enc, callback) => {
                    // Passing 'file.relative' because newer() above uses a relative
                    // path and this keeps it consistent.
                    file.path = path.resolve(file.base, swapSrcWithLib(file.relative));
                    callback(null, file);
                })
            )
            .pipe(gulp.dest(base));
    }))
);

gulp.task('scss', () => merge(config.sources.map(source => {
        const base = path.join(__dirname, source);
        return gulp.src(getSCSSFromCourse(source), { base: base })
            .pipe(newer({
                dest: base,
                map:  swapSrcWithStatic
            }))
            .pipe(sass().on('error', sass.logError))
            .pipe(prefixer())
            .pipe(mincss())
            .pipe(
                through.obj((file, enc, callback) => {
                    // Passing 'file.relative' because newer() above uses a relative
                    // path and this keeps it consistent.
                    file.path = path.resolve(file.base, swapSrcWithStatic(file.relative));
                    callback(null, file);
                })
            )
            .pipe(gulp.dest(base));
    }))
);

gulp.task('watch', [ 'build:js', 'copy', 'scss' ], () => {
    gulp.watch(config.sources.map(getGlobFromSource), [ 'build:js' ]);
    gulp.watch(config.sources.map(getOtherFilesForCopy), [ 'copy' ]);
    gulp.watch(config.sources.map(getSCSSFromCourse), [ 'scss' ]);
});

gulp.task('build', [ 'build:js', 'copy', 'scss' ]);
