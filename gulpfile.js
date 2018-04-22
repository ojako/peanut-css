/* global require */
/*jslint node:true */

'use strict';

let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let gulpPug = require('gulp-pug');

gulp.task('default', defaultTask);

gulp.task('minify', () => {
  return gulp.src('src/peanut.css')
    .pipe(cleanCSS({
      compatibility: '*',
      sourceMap: true,
      format: 'beautify',
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('views', () => {
  return gulp.src('templates/*.pug')
    .pipe(gulpPug({
      pretty: true,
    }))
    .pipe(gulp.dest('templates'));
    ;
    
})

function defaultTask(done) {
  done();
}