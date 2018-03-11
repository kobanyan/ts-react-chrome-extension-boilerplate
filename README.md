# ts-react-chrome-extension-boilerplate

[![Build Status](https://travis-ci.org/kobanyan/ts-react-chrome-extension-boilerplate.svg?branch=master)](https://travis-ci.org/kobanyan/ts-react-chrome-extension-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/kobanyan/ts-react-chrome-extension-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/kobanyan/ts-react-chrome-extension-boilerplate?branch=master)
[![codebeat badge](https://codebeat.co/badges/b37bdccf-3272-42d1-ac92-64963df66767)](https://codebeat.co/projects/github-com-kobanyan-ts-react-chrome-extension-boilerplate-master)
[![Dependency Status](https://david-dm.org/kobanyan/ts-react-chrome-extension-boilerplate.svg)](https://david-dm.org/kobanyan/ts-react-chrome-extension-boilerplate)
[![devDependency Status](https://david-dm.org/kobanyan/ts-react-chrome-extension-boilerplate/dev-status.svg)](https://david-dm.org/kobanyan/ts-react-chrome-extension-boilerplate#info=devDependencies)

Boilerplate to create a chrome extension with TypeScript and React.

## Features

- Write code with [TypeScript](https://www.typescriptlang.org/).
- Simple [React](https://reactjs.org/) example of Chrome Extension.
- Unit tests using [Jest](https://facebook.github.io/jest/) & [Enzyme](http://airbnb.io/enzyme/) & [Sinon.JS](http://sinonjs.org/).
- E2E tests using [Puppeteer](https://github.com/GoogleChrome/puppeteer).
- Lint using [TSLint](https://palantir.github.io/tslint/) & [tslint-react](https://github.com/palantir/tslint-react).
- Format using [Prettier](https://prettier.io/).

## Developing

1. Clone the repository. `git clone https://github.com/kobanyan/ts-react-chrome-extension-boilerplate`
1. Remove `.git` directory.
1. Run `yarn install`.
1. Change the package information in `package.json`, i.e. name, description, etc.
1. Change the package information in `resources/manifest.json`, i.e. name, description, etc.
1. Run `yarn dev`.
1. Load your extension on Chrome from `build/lib`.

## Unit testing

1. Run `yarn test`.

Unit test file's name must be `src/**/__tests__/**/*.test.ts?(x)`.

## E2E testing

1. Run `yarn e2e`.

E2E test file's name must be `src/**/__tests__/**/*.spec.ts`.

## Packaging

1. Put your private key file in `pem` directory. If the key file does not exist, the file will be generated.
1. Run `yarn prod`.
1. Your extension file (`.crx`) will be generated in `dist` directory.

## Structure

- build/lib  
  JavaScript files transpiled from TypeScript files in `src` and resource files copied from `resources`.
- dist  
  Chrome extension file. (`[extension-name].crx`)
- pem  
  Private key file.
- resources  
  Resource files, i.e. `manifest.json`, `message.json`, icon images, etc.
- scripts  
  Build script files.
- src  
  Source files.
- webpack  
  Webpack configuration files.

## License

MIT

## Author

[kobanyan](https://github.com/kobanyan)

## Credits

This boilerplate is inspired by [React Chrome Extension Boilerplate](https://github.com/jhen0409/react-chrome-extension-boilerplate).
