const gulp = require('gulp');
const del = require('del');
const path = require('path');
const webpack = require('webpack');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const webpackConfig = require('./webpack.config.js');

const paths = {
  layout: {
    src: 'index.html',
    dest: 'dist',
  },
};

const serve = new Serve({
  port: 3000,
  static: [path.resolve(__dirname, 'dist'), path.resolve(__dirname, 'dist/public')],
  hmr: false,
  liveReload: true,
});

// need 2 compilers - dev and prod without plugins
const compiler = webpack({ ...webpackConfig, plugins: [serve] });

const startDevServer = done => compiler.watch({}, done);

const reloadDevServer = done => {
  serve.emit('reload', { source: 'config' });
  done();
};

const clean = () => del(['dist']);

const copyLayout = () => gulp.src(paths.layout.src).pipe(gulp.dest(paths.layout.dest));

const bundleClientJs = done => compiler.run(done);

const watch = () => {
  gulp.watch(paths.layout.src, gulp.series(copyLayout, reloadDevServer));
};

const dev = gulp.series(clean, copyLayout, startDevServer, watch);

module.exports = {
  dev,
};
