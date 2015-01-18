var gulp     = require('gulp'),
    mocha    = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    jshint   = require('gulp-jshint');

gulp.task('mocha', function() {
  process.env.NODE_ENV = 'test';
  return gulp.src([
      'test/models/**/*.js',
      'test/actions/**/*.js',
      'test/repositories/**/*.js',
      'test/services/**/*.js'], { read: false }
    ).pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('watch-mocha', function() {
  process.env.NODE_ENV = 'test';
  gulp.watch(['core/**', 'test/**'], ['mocha']);
});

gulp.task('istanbul', function (cb) {
  process.env.NODE_ENV = 'test';
  gulp.src(['core/**/*.js', 'main.js'])
    .pipe(istanbul())
    .on('finish', function () {
      return gulp.src([
          'test/models/**/*.js',
          'test/repositories/**/*.js',
          'test/services/**/*.js',
          'test/actions/**/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});

gulp.task('lint', function() {
  return gulp.src([
    'core/**/*.js',
    'test/models/**/*.js',
    'test/actions/**/*.js',
    'test/repositories/**/*.js',
    'test/services/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});
