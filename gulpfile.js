var gulp     = require('gulp'),
    tap      = require('gulp-tap'),
    mocha    = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    jshint   = require('gulp-jshint');

gulp.task('mocha', function() {
  process.env.NODE_ENV = 'test';
  return gulp.src([
      'test/unit/*.js',
      'test/unit/models/**/*.js',
      'test/unit/actions/**/*.js',
      'test/unit/repositories/**/*.js',
      'test/unit/services/**/*.js'], { read: false }
    ).pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('watch-mocha', function() {
  process.env.NODE_ENV = 'test';
  gulp.watch(['core/**', 'test/**'], ['mocha']);
});

gulp.task('cover', function (cb) {
  process.env.NODE_ENV = 'test';
  gulp.src(['core/**/*.js'])
    .pipe(istanbul())
    .pipe(tap(function(f) {
      // wait until it's done
    }))
    .on('end', function () {
      gulp.src([
          'test/*.js',
          'test/models/**/*.js',
          'test/repositories/**/*.js',
          'test/services/**/*.js',
          'test/actions/**/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports({
          reporters: [ 'lcov' ],
        }))
        .on('end', cb);
    });
});

gulp.task('lint', function() {
  gulp.src([
    'core/**/*.js',
    'test/models/**/*.js',
    'test/actions/**/*.js',
    'test/repositories/**/*.js',
    'test/services/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});
