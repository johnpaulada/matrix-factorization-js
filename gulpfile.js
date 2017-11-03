const gulp = require('gulp');
const pump = require('pump');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const uglifyCompressOptions = {
  properties: true,
  dead_code: true,
  drop_debugger: true,
  conditionals: true,
  loops: true,
  unused: true,
  toplevel: true,
  inline: true,
  drop_console: true
}

const uglifyMangleOptions = {
  toplevel: true
}

const uglifyOutputOptions = {
  beautify: false
}

gulp.task('js', function(cb){
  pump([
    gulp.src('src/matrix-factorization.js'),
    babel({presets: 'es2015'}),
    uglify({
      compress: uglifyCompressOptions,
      mangle: uglifyMangleOptions,
      output: uglifyOutputOptions
    }),
    rename({suffix: '.min'}),
    gulp.dest('dist/'),
    rename('index.js'),
    gulp.dest('.')
  ], cb)
});



gulp.task('default', ['js'])