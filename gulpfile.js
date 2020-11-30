const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const minify = require('gulp-minify');
const concat = require('gulp-concat');

gulp.task('styles', () => {
    return gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

gulp.task('clean', () => {
    return del([
        'css/style.css',
    ]);
});

gulp.task('watch', () => {
    gulp.watch('sass/**/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});

gulp.task('pack-js', function () {    
    return gulp.src(['js/*.js'])
        //.pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('js'));
});

gulp.task('default', gulp.series(['clean', 'styles','pack-js']));