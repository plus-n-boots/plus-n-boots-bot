var babel = require('gulp-babel')
var gulp = require('gulp')
var plumber = require('gulp-plumber')

var paths = {
  js: 'src/**/*.js'
}

/**
 * transpile code & move to build dir
 */
gulp.task('js', function () {
  return gulp.src(paths.js)
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('build'))
})

/**
 * watch for changes in src dir
 */
gulp.task('watch', function() {
  gulp.watch(paths.js, ['js'])
})
