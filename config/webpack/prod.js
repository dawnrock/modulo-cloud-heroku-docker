const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const base = require('./base');
const helpers = require('./helpers');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: helpers.resolveFromRootPath('dist'),
    filename: './js/[name].[chunkhash].js',
    assetModuleFilename: './images/[hash][ext][query]',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      vendor: {
        chunks: 'all',
        name: 'vendor',
        test: /[\\/]node_modules[\\/]/,
        enforce: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: './images/[name].[hash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: 'prod.env',
      systemvars: true,
    }),
  ],
});
