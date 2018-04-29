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
    glob: 'templates/**/*.pug',
    src: 'templates/index.pug',
    dest: './',
  },
}

// Kill generated files
gulp.task('clean', () => 
  del(paths.generatedFiles.src)
);

// Minify CSS
gulp.task('minify', () => {
  return gulp
    .src('dist/peanut.css')
    .pipe(cleanCSS({
      compatibility: '*',
      sourceMap: true,
      format: 'minify',
    }))
    .pipe(rename('peanut.min.css'))
    .pipe(gulp.dest(paths.styles.dest), ['default']);
});

// Compile SCSS
gulp.task('sass', () => {
  return gulp
    .src(paths.styles.glob)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest));
});

// Compile pug
gulp.task('views', () => {
  return gulp
    .src(paths.templates.src)
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest(paths.templates.dest));
});

// Watch files
gulp.task('watch', () => {
  gulp.watch(
    [
      paths.styles.glob,
      paths.templates.glob,
    ],
    gulp.series('default')
  );
});

// Do the stuff
gulp.task(
  'default',
  gulp.series(
    'views',
    'sass',
    'minify',
  )
);