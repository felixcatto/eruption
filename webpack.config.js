const path = require('path');
const { merge } = require('webpack-merge');

const common = {
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist/public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports = merge(common, {
    mode: 'production',
    entry: {
      index: path.resolve(__dirname, 'client/index.js'),
    },
  });
} else {
  module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
      index: [path.resolve(__dirname, 'client/index.js'), 'webpack-plugin-serve/client'],
    },
  });
}
