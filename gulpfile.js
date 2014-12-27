var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('mocha', function() {
  process.env.NODE_ENV = 'test';
  return gulp.src([
      'test/models/**/*.js',
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

gulp.task('coverage', function (cb) {
  process.env.NODE_ENV = 'test';
  gulp.src(['core/**/*.js', 'main.js'])
    .pipe(istanbul())
    .on('finish', function () {
      gulp.src([
          'test/models/**/*.js',
          'test/repositories/**/*.js',
          'test/services/**/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});
