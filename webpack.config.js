const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    browsers: [
                      'last 2 Chrome versions',
                      'last 2 Edge versions',
                      'last 2 Firefox versions',
                      'last 2 Safari versions',
                    ],
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
              '@reatom/babel-plugin',
            ],
          },
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
