const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const babelConfig = require('./babelconfig.js');
const babel = require('gulp-babel');
const forever = require('forever-monitor');

const paths = {
  layout: {
    src: 'public/index.html',
    dest: 'dist/public',
  },
  img: {
    src: 'public/img/**/*',
    dest: 'dist/public/img',
  },
  serverJs: {
    src: ['*/**/*.js', '!node_modules/**', '!dist/**', '!client/**'],
    dest: 'dist',
  },
};

const server = new forever.Monitor('dist/bin/server.js');

const startServer = done => {
  server.on('start', () => done());
  server.start();
};

const reloadServer = done => {
  server.removeAllListeners('restart');
  server.on('restart', () => done());
  server.restart();
};

const compiler = webpack(webpackConfig);

const startDevServer = done => compiler.watch({}, done);

const reloadDevServer = done => {
  const [devServer] = webpackConfig.plugins;
  devServer.emit('reload');
  done();
};

const clean = () => del(['dist']);

const copyLayout = () => gulp.src(paths.layout.src).pipe(gulp.dest(paths.layout.dest));

const copyMisc = () => gulp.src(paths.img.src).pipe(gulp.dest(paths.img.dest));

const bundleClientJs = done => compiler.run(done);

const transpileServerJs = () =>
  gulp
    .src(paths.serverJs.src, { since: gulp.lastRun(transpileServerJs) })
    .pipe(babel(babelConfig.server))
    .pipe(gulp.dest(paths.serverJs.dest));

const trackChangesInDist = () => {
  const watcher = gulp.watch(['dist/**/*']);
  watcher
    .on('add', path => console.log(`File ${path} was added`))
    .on('change', path => console.log(`File ${path} was changed`))
    .on('unlink', path => console.log(`File ${path} was removed`));
};

const watch = () => {
  gulp.watch(paths.layout.src, gulp.series(copyLayout, reloadServer, reloadDevServer));
  gulp.watch(paths.serverJs.src, gulp.series(transpileServerJs, reloadServer));
  trackChangesInDist();
};

const dev = gulp.series(
  clean,
  copyLayout,
  copyMisc,
  transpileServerJs,
  startServer,
  startDevServer,
  watch
);

const prod = gulp.series(clean, copyLayout, copyMisc, bundleClientJs, transpileServerJs);

module.exports = {
  dev,
  prod,
};
