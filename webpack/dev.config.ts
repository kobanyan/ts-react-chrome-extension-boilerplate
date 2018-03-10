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
} from './com.config';

const config: webpack.Configuration = {
  entry,
  output,
  devtool: 'source-map',
  resolve,
  module: {
    rules: [
      atLoader,
      tslintLoader,
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [copyPlugin(), unusedFilesPlugin(), circularDependencyPlugin()],
};

export = config;
