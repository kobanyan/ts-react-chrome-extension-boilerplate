import * as webpack from 'webpack';

import {
  entry,
  output,
  resolve,
  atLoader,
  tslintLoader,
  copyPlugin,
  unusedFilesPlugin,
  circularDependencyPlugin,
} from './lib';

const config: webpack.Configuration = {
  entry,
  output,
  resolve,
  module: {
    rules: [atLoader, tslintLoader],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin(),
    copyPlugin(),
    unusedFilesPlugin(),
    circularDependencyPlugin(),
  ],
};

export = config;
