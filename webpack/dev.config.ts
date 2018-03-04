import * as path from 'path';
import copyWebpackPlugin from 'copy-webpack-plugin';
export = {
  entry: {
    background: './src/background/index.ts',
    content_scripts: './src/content_scripts/index.ts',
    options: './src/options/index.tsx',
    page_action: './src/page_action/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, '../build/dev'),
    filename: '[name]/[name].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: './tsconfig/dev.json',
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
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
  ],
};
