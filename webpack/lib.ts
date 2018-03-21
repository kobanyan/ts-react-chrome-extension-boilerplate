import * as path from 'path';
import * as webpack from 'webpack';
import copyWebpackPlugin from 'copy-webpack-plugin';
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

export const entry = {
  background: './src/background/index.ts',
  content_scripts: './src/content_scripts/index.ts',
  options: './src/options/index.tsx',
  page_action: './src/page_action/index.tsx',
};

export const output: webpack.Output = {
  path: path.resolve(__dirname, '../build/lib'),
  filename: '[name]/[name].js',
};

export const resolve: webpack.Resolve = {
  extensions: ['.ts', '.tsx', '.js', '.json'],
};

export const atLoader: webpack.LoaderRule = {
  test: /\.tsx?$/,
  loader: 'awesome-typescript-loader',
};

export const tslintLoader: webpack.LoaderRule = {
  enforce: 'pre',
  test: /\.tsx?$/,
  loader: 'tslint-loader',
  options: {
    typeCheck: true,
    emitErrors: true,
  },
};

export function copyPlugin(): webpack.Plugin {
  return new copyWebpackPlugin([
    { from: 'resources', ignore: ['manifest.json'] },
    {
      from: 'resources/manifest.json',
      transform(content: string, contentPath: string) {
        return content
          .toString() // typedefs bug. content is Buffer.
          .replace(/\${version}/, require('../package.json').version);
      },
    },
  ]);
}

export function unusedFilesPlugin(): webpack.Plugin {
  return new UnusedFilesWebpackPlugin({
    patterns: ['src/**/*.*'],
    failOnUnused: true,
    globOptions: {
      ignore: ['node_modules/**/*', '**/__tests__/**/*'],
    },
  });
}

export function circularDependencyPlugin(): webpack.Plugin {
  return new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true,
    cwd: process.cwd(),
  });
}
