import * as path from 'path';
import * as webpack from 'webpack';
import copyWebpackPlugin from 'copy-webpack-plugin';
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
export = {
  entry: {
    background: './src/background/index.ts',
    content_scripts: './src/content_scripts/index.ts',
    options: './src/options/index.tsx',
    page_action: './src/page_action/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, '../build/prod'),
    filename: '[name]/[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: './tsconfig/prod.json',
        },
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new copyWebpackPlugin([
      { from: 'resources', ignore: ['manifest.json'] },
      {
        from: 'resources/manifest.json',
        transform(content: string, contentPath: string) {
          return content
            .toString() // typedefs bug. content is Buffer.
            .replace(/\${version}/, require('../package.json').version);
        },
      },
    ]),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin(),
    new UnusedFilesWebpackPlugin({
      patterns: ['src/**/*.*'],
      failOnUnused: true,
    }),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
  ],
};
