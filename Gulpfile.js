const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => gulp
    .src('./assets/src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/static/css'))
);

gulp.task('watch', () => {
    gulp.watch('./assets/src/scss/**/**.scss', [ 'sass' ]);
});
