const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', function() {
  gulp.src('./src/test.js')
    .pipe(mocha({ reporter: 'nyan' }))
    .on('error', function() {
      console.log('Tests failed');
    });
});

gulp.task('watch', ['test'], function() {
  gulp.watch(['./src/*.js'], ['test']);
});
