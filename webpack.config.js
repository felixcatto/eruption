const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const babelConfig = require('./babelconfig.js');

const outputPath = path.resolve(__dirname, 'dist/public');

const devServer = new Serve({
  port: 3000,
  hmr: false,
  liveReload: false,
  client: {
    silent: true,
  },
  // static: [outputPath],
  // historyFallback: true,
  // liveReload: true,
  // middleware: (app, builtins) => {
  //   app.use(
  //     builtins.proxy('/', {
  //       target: 'http://localhost:4000',
  //       ws: false,
  //     })
  //   );
  // },
});

const common = {
  entry: {
    index: path.resolve(__dirname, 'client/index.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig.client,
        },
      },
      {
        test: /module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /(?<!module)\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'font',
            publicPath: '../font',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  stats: {
    warnings: false,
    children: false,
    modules: false,
  },
};

if (process.env.ANALYZE) {
  const plugins = [new BundleAnalyzerPlugin({ openAnalyzer: false })].concat(common.plugins);
  module.exports = {
    ...common,
    mode: 'production',
    plugins,
  };
} else if (process.env.NODE_ENV === 'production') {
  module.exports = {
    ...common,
    mode: 'production',
  };
} else {
  const plugins = [devServer].concat(common.plugins);
  const entry = {
    index: [common.entry.index, 'webpack-plugin-serve/client'],
  };

  module.exports = {
    ...common,
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry,
    plugins,
  };
}
