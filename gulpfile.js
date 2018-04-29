/* global require */
/*jslint node:true */
'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
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
    glob: 'src/**/*.scss',
    src: 'src',
    dest: 'dist',
  },
  templates: {
    glob: 'templates/index.pug',
    src: 'templates',
    dest: './',
  },
}

// Kill generated files
gulp.task('clean', () => 
  del(paths.generatedFiles.src)
);

gulp.task('minify', () => {
  return gulp
    .src('dist/peanut.css')
    .pipe(cleanCSS({
      compatibility: '*',
      sourceMap: true,
      format: 'minify',
    }))
    .pipe(rename('peanut.min.css'))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('watch', () => {
  gulp.watch(paths.styles.src)
    .series('sass');
  
  gulp.watch(paths.templates.src)
    .series('views');
//  return watch('src/**/*', [
//    'views',
//    'cssSASS',
//  ]);
});

gulp.task('sass', () => {
  return gulp
    .src(paths.styles.glob)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('views', () => {
  return gulp
    .src(paths.templates.glob)
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest(paths.templates.dest));
});

gulp.task(
  'default',
  gulp.series(
    'clean',
    'views',
    'sass',
    'minify',
//    'watch',
  )
);