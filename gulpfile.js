"use strict";

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  minify = require('gulp-cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  wrap = require('gulp-wrap'),
  concat = require('gulp-concat'),
  autoprefixer = require('gulp-autoprefixer'),
  path = require('path'),
  htmlreplace = require('gulp-html-replace'),
  templateCache = require('gulp-angular-templatecache');

var outputFolder = 'dist/';
var demoOutputFolder = 'demo-dist/';
var moduleName = 'mdPickers';

gulp.task('assets', function() {
  return gulp.src([
      'src/core/**/*.less',
      'src/components/**/*.less'
    ])
    .pipe(concat('mdPickers.less'))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest(outputFolder))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minify())
    .pipe(gulp.dest(outputFolder));
});

gulp.task('build-templatecache', function() {
  return gulp.src(['src/components/**/*.html'])
    .pipe(templateCache({
      module: 'mdpTemplates',
      standalone: true,
      transformUrl: function(url) {
        var parts = url.split(/(\\|\/)/);
        return parts[parts.length - 1];
      }
    }))
    .pipe(gulp.dest(outputFolder));
});

gulp.task('build-app', function() {
  return gulp.src([
      'dist/templates.js',
      'src/mdPickers.js',
      'src/core/**/*.js',
      'src/components/**/*.js'
    ])
    .pipe(concat('mdPickers.js'))
    .pipe(wrap('(function() {\n"use strict";\n<%= contents %>\n})();'))
    .pipe(sourcemaps.init())
    .pipe(gulp.dest(outputFolder))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputFolder));
});

gulp.task('build-demo-js', function() {
  return gulp.src(['demo/*.js'])
    .pipe(concat('demo.js'))
    .pipe(wrap('(function() {\n"use strict";\n<%= contents %>\n})();'))
    .pipe(sourcemaps.init())
    .pipe(gulp.dest(demoOutputFolder))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(demoOutputFolder));
});

gulp.task('build-demo-html', function() {
  return gulp.src(['demo/*.html'])
    .pipe(htmlreplace({
      'css': '../dist/mdPickers.min.css',
      'js': '../dist/mdPickers.min.js',
      'demojs': 'demo.min.js'
    }))
    .pipe(gulp.dest(demoOutputFolder));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['assets', 'build-templatecache', 'build-app']);
});

gulp.task('default', ['assets', 'build-templatecache', 'build-app', 'watch']);

gulp.task('demo', ['default', 'build-demo-js', 'build-demo-html']);
