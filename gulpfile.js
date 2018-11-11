/* global require */
/*jslint node:true */
'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const cleanCSS = require('gulp-clean-css');
const postCSS = require('gulp-postcss');
const cssNext = require('postcss-cssnext');
const cssNano = require('cssnano');
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
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const autoprefixer = require('autoprefixer');
const browserify = require('gulp-browserify');

// Files to be processed
const paths = {
  generatedFiles: {
    glob: [
      'dist/**/*',
    ],
    src: [
      'dist',
    ],
  },
  styles: {
    glob: 'src/**/*.scss',
    src: 'src/peanut.scss',
    dest: 'dist',
  },
  scripts: {
    glob: 'demo/**/*.ts',
    src: 'demo/**/*.ts',
    dest: 'dist/demo',
  },
  templates: {
    glob: 'demo/**/*.pug',
    src: 'demo/index.pug',
    dest: 'dist/demo',
  },
}

// Destroy generated files
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

gulp.task('postcss', () => {
  const processors = [
    // cssNext,
    autoprefixer,
    cssNano,
  ]

  return gulp
    .src(paths.styles.src)
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(sourcemaps.write(paths.styles.dest))
    .pipe(postCSS(processors))
    .pipe(rename('peanut.min.css'))
    .pipe(gulp.dest(paths.styles.dest))
  }
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

// Typescript
gulp.task('scripts', () =>
  gulp
    .src(paths.scripts.src)
    .pipe(newer(paths.scripts.dest))
    .pipe(ts())
    .pipe(browserify({
      insertGlobals : true,
        debug : !gulp.env.production
      }))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
);

// Watch files
gulp.task('watch', () =>
  gulp
    .watch(
      [
        paths.styles.glob,
        paths.templates.glob,
        paths.scripts.glob,
      ],
      gulp.series('dev')
    )
  );

// Browser sync
gulp.task('sync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })

  gulp
    .watch(
      [
        paths.styles.glob,
        paths.templates.glob,
        paths.scripts.glob,
      ],
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

// Quick build for dev
gulp.task('dev',
  gulp
    .series(
      'sass-lint',
      'postcss',
      'views',
      'scripts',
    )
);

// Do the stuff
gulp.task('default',
  gulp
    .series(
      'clean',
      'dev',
    )
);
