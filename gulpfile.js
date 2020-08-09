const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const babel = require('gulp-babel');
const EventEmitter = require('events');
const webpackConfig = require('./webpack.config.js');
const babelConfig = require('./babelconfig.js');

const { series, parallel } = gulp;

const paths = {
  layout: {
    src: 'public/html/index.html',
    dest: 'dist/public/html',
  },
  public: {
    src: 'public/**/*',
    dest: 'dist/public',
  },
  serverJs: {
    src: ['*/**/*.js', '!node_modules/**', '!dist/**', '!client/**'],
    dest: 'dist',
  },
  clientJs: {
    src: 'client/**/*.js',
    dest: 'dist/client',
  },
  cssModule: {
    src: 'client/**/*module.scss',
    dest: 'dist/client',
  },
};

const clearCache = () =>
  Object.keys(require.cache)
    .filter(p => !p.match(/node_modules/) && p.match(/dist/))
    .forEach(key => delete require.cache[key]);

let server;
const startServer = done => {
  clearCache();
  const getApp = require('./dist/main').default; // eslint-disable-line
  const app = getApp();
  server = app.listen(process.env.PORT || 4000, () => done());
};

const restartServer = done => {
  server.close(() => startServer(done));
};

const webpackEmitter = new EventEmitter();
const compiler = webpack(webpackConfig);
compiler.hooks.done.tap('done', () => webpackEmitter.emit('webpackDone'));

const startDevServer = done => compiler.watch({}, done);

const reloadDevServer = done => {
  const [devServer] = webpackConfig.plugins;
  devServer.emit('reload');
  done();
};

const clean = () => del(['dist']);

const copyLayout = () => gulp.src(paths.layout.src).pipe(gulp.dest(paths.layout.dest));

const copyMisc = parallel(
  () => gulp.src(paths.public.src).pipe(gulp.dest(paths.public.dest)),
  () => gulp.src(paths.cssModule.src).pipe(gulp.dest(paths.cssModule.dest))
);

const bundleClientJs = done => compiler.run(done);
const fakeBundleClientJs = done => webpackEmitter.once('webpackDone', () => done());

const transpileServerJs = () =>
  gulp
    .src(paths.serverJs.src, { since: gulp.lastRun(transpileServerJs) })
    .pipe(babel(babelConfig.server))
    .pipe(gulp.dest(paths.serverJs.dest));

const transpileClientJsForSSR = () =>
  gulp
    .src(paths.clientJs.src, { since: gulp.lastRun(transpileClientJsForSSR) })
    .pipe(babel(babelConfig.server))
    .pipe(gulp.dest(paths.clientJs.dest));

const trackChangesInDist = () => {
  const watcher = gulp.watch(['dist/**/*']);
  watcher
    .on('add', path => console.log(`File ${path} was added`))
    .on('change', path => console.log(`File ${path} was changed`))
    .on('unlink', path => console.log(`File ${path} was removed`));
};

const watch = done => {
  gulp.watch(paths.layout.src, series(copyLayout, restartServer, reloadDevServer));
  gulp.watch(paths.serverJs.src, series(transpileServerJs, restartServer));
  gulp.watch(
    paths.clientJs.src,
    series(
      parallel(fakeBundleClientJs, series(transpileClientJsForSSR, restartServer)),
      reloadDevServer
    )
  );
  trackChangesInDist();
  done();
};

const dev = series(
  clean,
  parallel(copyLayout, copyMisc, transpileServerJs, transpileClientJsForSSR, startDevServer),
  startServer,
  watch
);

const prod = series(
  clean,
  copyLayout,
  copyMisc,
  bundleClientJs,
  transpileClientJsForSSR,
  transpileServerJs
);

module.exports = {
  dev,
  prod,
};
