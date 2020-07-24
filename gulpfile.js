const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const webpackConfig = require('./webpack.config.js');

const paths = {
  layout: {
    src: 'index.html',
    dest: 'dist/public',
  },
  img: {
    src: 'public/img/**/*',
    dest: 'dist/public/img',
  },
};

const serve = new Serve({
  port: 3000,
  static: [webpackConfig.output.path],
  hmr: false,
  liveReload: true,
  historyFallback: true,
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

const copyMisc = () => gulp.src(paths.img.src).pipe(gulp.dest(paths.img.dest));

const bundleClientJs = done => compiler.run(done);

const trackChangesInDist = () => {
  const watcher = gulp.watch(['dist/**/*']);
  watcher
    .on('add', path => console.log(`File ${path} was added`))
    .on('change', path => console.log(`File ${path} was changed`))
    .on('unlink', path => console.log(`File ${path} was removed`));
};

const watch = () => {
  gulp.watch(paths.layout.src, gulp.series(copyLayout, reloadDevServer));
  trackChangesInDist();
};

const dev = gulp.series(clean, copyLayout, copyMisc, startDevServer, watch);
const prod = gulp.series(clean, copyLayout, copyMisc, bundleClientJs);

module.exports = {
  dev,
  prod,
};
