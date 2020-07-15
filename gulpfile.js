const gulp = require('gulp');
const del = require('del');

const clean = () => del(['dist']);

const copyMisc = gulp.series(
  () => gulp.src('client/index.html').pipe(gulp.dest('dist/client')),
  () => gulp.src('client/index.js').pipe(gulp.dest('dist/client')),
);

const dev = gulp.series(
  clean,
  copyMisc,
);

module.exports = {
  dev,
};
