var gulp     = require('gulp'),
    tap      = require('gulp-tap'),
    mocha    = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    jshint   = require('gulp-jshint');

gulp.task('tests', function() {
  process.env.NODE_ENV = 'test';
  return gulp.src([
      'test/integration/*.js',
      'test/unit/*.js',
      'test/unit/models/**/*.js',
      'test/unit/actions/**/*.js',
      'test/unit/repositories/**/*.js',
      'test/unit/services/**/*.js'], { read: false }
    ).pipe(mocha({
      reporter: 'nyan'
    })).once('end', function () {
      process.exit();
    });
});

gulp.task('integration-tests', function() {
  process.env.NODE_ENV = 'test';
  return gulp.src([
      'test/integration/**/*.js'], { read: false }
    ).pipe(mocha({
      reporter: 'nyan'
    })).once('end', function () {
      process.exit();
    });
});

gulp.task('unit-tests', function() {
  process.env.NODE_ENV = 'test';
  return gulp.src([
      'test/unit/*.js',
      'test/unit/models/**/*.js',
      'test/unit/actions/**/*.js',
      'test/unit/infrastructure/**/*.js',
      'test/unit/repositories/**/*.js',
      'test/unit/services/**/*.js'], { read: false }
    ).pipe(mocha({
      reporter: 'nyan'
    })).once('end', function () {
      process.exit();
    });
});

gulp.task('watch-mocha', function() {
  process.env.NODE_ENV = 'test';
  gulp.watch(['core/**', 'test/**'], ['mocha']);
});

gulp.task('coverage', function (cb) {
  process.env.NODE_ENV = 'test';
  gulp.src(['core/**/*.js'])
    .pipe(istanbul())
    .pipe(tap(function(f) {
      // wait until it's done
    }))
    .on('end', function () {
      gulp.src([
          'test/integration/*.js',
          'test/unit/*.js',
          'test/unit/models/**/*.js',
          'test/unit/actions/**/*.js',
          'test/unit/infrastructure/**/*.js',
          'test/unit/repositories/**/*.js',
          'test/unit/services/**/*.js'])
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
    'test/integration/*.js',
    'test/unit/models/**/*.js',
    'test/unit/actions/**/*.js',
    'test/unit/repositories/**/*.js',
    'test/unit/services/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});
