const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const babel = require('gulp-babel');
const EventEmitter = require('events');
const { makeServer, listen } = require('blunt-livereload');
const webpackConfig = require('./webpack.config.js');
const babelConfig = require('./babelconfig.js');

const { series, parallel } = gulp;

const paths = {
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

const restartServer = done => server.close(() => startServer(done));

const webpackEmitter = new EventEmitter();
const compiler = webpack(webpackConfig);
compiler.hooks.done.tap('done', () => webpackEmitter.emit('webpackDone'));
const startWebpack = done => compiler.watch({}, done);

const devServer = makeServer();
const startDevServer = async () => listen(devServer);
const reloadBrowser = async () => devServer.reloadBrowser();

const clean = () => del(['dist']);

const copyPublic = () => gulp.src(paths.public.src).pipe(gulp.dest(paths.public.dest));
const copyPublicDev = () =>
  gulp
    .src(paths.public.src, { since: gulp.lastRun(copyPublicDev) })
    .pipe(gulp.symlink(paths.public.dest, { overwrite: false }));

const bundleClientJs = done => compiler.run(done);
const fakeBundleClientJs = done => webpackEmitter.once('webpackDone', () => done());

const transpileServerJs = () =>
  gulp
    .src(paths.serverJs.src, { since: gulp.lastRun(transpileServerJs) })
    .pipe(babel(babelConfig.server))
    .pipe(gulp.dest(paths.serverJs.dest));

const transpileClientJs = () =>
  gulp
    .src(paths.clientJs.src, { since: gulp.lastRun(transpileClientJs) })
    .pipe(babel(babelConfig.server))
    .pipe(gulp.dest(paths.clientJs.dest));

const trackChangesInDist = () => {
  const watcher = gulp.watch(['dist/**/*']);
  watcher
    .on('add', path => console.log(`File ${path} was added`))
    .on('change', path => console.log(`File ${path} was changed`))
    .on('unlink', path => console.log(`File ${path} was removed`));
};

const watch = async () => {
  gulp.watch(paths.public.src, series(copyPublicDev, restartServer, reloadBrowser));
  gulp.watch(paths.serverJs.src, series(transpileServerJs, restartServer));
  gulp.watch(
    paths.clientJs.src,
    series(parallel(fakeBundleClientJs, series(transpileClientJs, restartServer)), reloadBrowser)
  );
  trackChangesInDist();
};

const dev = series(
  clean,
  parallel(copyPublicDev, transpileServerJs, transpileClientJs, startWebpack, startDevServer),
  startServer,
  watch
);

const prod = series(clean, copyPublic, bundleClientJs, transpileClientJs, transpileServerJs);

module.exports = {
  dev,
  prod,
};
