/* eslint-disable*/
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const gulpSourcemaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const concat = require('gulp-concat')
const uglify = require('gulp-uglifyjs')

gulp.task('scss', () => {
    return gulp
        .src('dev/scss/**/*.scss')
        .pipe(plumber())
        .pipe(gulpSourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
                cascade: true
            })
        )
        .pipe(cssnano())
        .pipe(gulpSourcemaps.write('./maps'))
        .pipe(gulp.dest('public/stylesheets'))
})

gulp.task('scripts', () =>
    gulp
        .src(['dev/js/**/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'))
)

gulp.task('default', ['scss', 'scripts'], () => {
    gulp.watch('dev/scss/**/*.scss', ['scss'])
    gulp.watch('dev/js/**/*.js', ['scripts'])
})
