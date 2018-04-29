/* global require */
/*jslint node:true */

'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const cleanCSS = require('gulp-clean-css');
const scss = require('gulp-sass');
const pug = require('gulp-pug');
const del = require('del');

// Files to be processed
const paths = {
  generatedFiles: {
    src: [
      'dist', 
      'index.html',
    ],
  },
  styles: {
    src: 'src/peanut.css',
    dest: 'dist/peanut.css',
  },
  templates: {
    src: 'templates/index.pug',
    dest: '',
  },
}

// Kill generated files
function clean() {
  return del(paths.generatedFiles.src);
}

function watch() {
  gulp.watch([
    paths.styles.src,
    paths.templates.src,
  ])
}

gulp.task('minify', () => {
  return gulp.src('src/peanut.css')
    .pipe(cleanCSS({
      compatibility: '*',
      sourceMap: true,
      format: 'beautify',
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  return watch('src/**/*', [
    'views',
    'cssSASS',
  ]);
});

gulp.task('cssSASS', () => {
   return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('views', () => {
  return gulp.src('templates/index.pug')
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', defaultTask);

//watch() => {
//  //
//}

function defaultTask(done) {
  done();
}