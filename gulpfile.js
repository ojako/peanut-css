/* global require */
/*jslint node:true */
'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const del = require('del');
const zip = require('gulp-zip');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();
const sassLint = require('gulp-sass-lint');
const version = require('gulp-version-number');

// Files to be processed
const paths = {
  generatedFiles: {
    glob: [
      'dist/**/*',
      'index.html',
    ],
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

// Create archive of essential files
gulp.task('zip', () =>
  gulp
    .src(paths.generatedFiles.glob)
    .pipe(zip('archive.zip', {
      compress: true,
    }))
    .pipe(gulp.dest(paths.styles.dest))
);

// Minify CSS
gulp.task('minify', () =>
  gulp
    .src('dist/peanut.css')
    .pipe(cleanCSS({
      compatibility: '*',
      sourceMap: true,
      format: 'minify',
    }))
    .pipe(rename('peanut.min.css'))
    .pipe(gulp.dest(paths.styles.dest), ['default'])
);

// Compile SCSS
gulp.task('sass', () =>
  gulp
    .src(paths.styles.glob)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write(paths.styles.dest))
    .pipe(gulp.dest(paths.styles.dest))
);

// Lint SCSS
gulp.task('sass-lint', () =>
  gulp
    .src(paths.styles.glob)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
);

// Compile pug
gulp.task('views', () =>
  gulp
    .src(paths.templates.src)
    .pipe(newer(paths.templates.dest))
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest(paths.templates.dest))
);

// Watch files
gulp.task('watch', () =>
  gulp
    .watch(
      [
        paths.styles.glob,
        paths.templates.glob,
      ],
      gulp.series('dev')
    )
  );

// gulp.task('version', () => {
//   gulp
//     .pipe(gulp.dest('build'))
//   });

// Browser sync
gulp.task('sync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })

  gulp
    .watch(
      [paths.styles.glob, paths.templates.glob],
      gulp
        .series('dev')
    )

  gulp
    .watch(paths.generatedFiles.glob)
    .on('change', browserSync.reload);
  })

// gulp.task('version',
//   gulp
//     .series(
//       'default',
//       'createImage',
//       'vTest',
//       'fTest'
//     )
// );


// gulp.task('createImage',)

// Quick build for dev
gulp.task('dev',
  gulp
    .series(
      'views',
      'sass',
      'sass-lint',
      'minify',
    )
);

// Do the stuff
gulp.task('default',
  gulp
    .series(
      'clean',
      'views',
      'sass',
      'sass-lint',
      'minify',
    )
);
