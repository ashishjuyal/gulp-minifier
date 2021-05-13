const { series, parallel } = require('gulp');
const { src, dest }  = require("gulp");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const del = require("del");

function clean(cb) {
  // https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
  return del([
    'dist',
  ]);
}

function uglify_js(cb) {
  return src('assets/js/**/*.js', { allowEmpty: true })
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist'))
}

function uglify_css(cb) {
  return src('assets/css/**/*.css', { allowEmpty: true })
    .pipe(concat('main.css'))
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    // .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist'))
}

const build = series(clean, parallel(uglify_js, uglify_css));
exports.default = build;
