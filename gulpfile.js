var babel = require('gulp-babel')
var gulp = require('gulp')
var plumber = require('gulp-plumber')

var paths = {
  js: 'src/**/*.js'
}

gulp.task('js', function () {
  return gulp.src(paths.js)
    .pipe(plumber())
    .pipe(babel({stage: 1}))
    .pipe(gulp.dest('build'))
})

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js'])
})
