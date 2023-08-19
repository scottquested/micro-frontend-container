/* eslint-disable @typescript-eslint/no-var-requires */
const { DefinePlugin } = require('webpack');
const { mergeWithRules } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const commonConfig = require('./webpack.common');
const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require('../package.json');
const federationConfig = require('../federation.config.json');
const path = require('path');
const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin').default;

const src = [path.resolve(__dirname, '..', 'src')];

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3000/',
    filename: '[name].js'
  },
  devServer: {
    port: 3000,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true
    }
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['babel-loader', 'ts-loader'],
        include: src
      }
    ]
  },
  plugins: [
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
    new ModuleFederationPlugin({
      ...federationConfig,
      filename: 'remote.js',
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom']
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: dependencies['react-router-dom']
        },
        tailwindcss: {
          singleton: true,
          eager: true,
          requiredVersion: dependencies['tailwindcss']
        }
      }
    }),
    new WebpackRemoteTypesPlugin({
      remotes: { ...federationConfig.remotes },
      outputDir: 'src/@federated',
      remoteFileName: '[name]_dts.tgz'
    }),
    new DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: 'development' })
    })
  ]
};

const customMerge = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: 'replace',
      include: 'replace'
    }
  }
});

module.exports = customMerge(commonConfig, devConfig);
