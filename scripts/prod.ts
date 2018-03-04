import * as fs from 'fs';
const packageName = require('../package.json').name;
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as shell from 'shelljs';
rimraf.sync(path.resolve(__dirname, '../build/prod'), {});
rimraf.sync(path.resolve(__dirname, `../dist/${packageName}.crx`), {});
if (shell.exec('webpack --config ./webpack/prod.config.ts --bail').code !== 0) {
  shell.exit(1);
}
const pem = fs.existsSync(path.resolve(__dirname, '../pem/key.pem')) ? '-p pem/key.pem' : '';
shell.exec(`crx pack build/prod -o dist/${packageName}.crx ${pem}`);
