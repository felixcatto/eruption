const gulp = require('gulp');
const del = require('del');
const path = require('path');
const webpack = require('webpack');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const webpackConfig = require('./webpack.config.js');

const paths = {
  layout: {
    src: 'index.html',
    dest: 'dist/public',
  },
};

const serve = new Serve({
  port: 3000,
  static: [webpackConfig.output.path],
  hmr: false,
  liveReload: true,
  client: {
    silent: true,
  },
});

if (process.env.NODE_ENV !== 'production') {
  webpackConfig.plugins = (webpackConfig.plugins || []).concat(serve);
}

const compiler = webpack(webpackConfig);

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
const prod = gulp.series(clean, copyLayout, bundleClientJs);

module.exports = {
  dev,
  prod,
};
