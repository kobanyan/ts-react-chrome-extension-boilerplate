import * as path from 'path';
import * as rimraf from 'rimraf';
import * as shell from 'shelljs';
rimraf.sync(path.resolve(__dirname, '../build/dev'), {});
shell.exec('webpack --config ./webpack/dev.config.ts --progress --profile --colors --watch');
