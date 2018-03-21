const path = require('path');
const extPath = path.resolve('build/lib');

module.exports = {
  launch: {
    headless: false,
    slowMo: 200,
    timeout: 0,
    args: [`--lang=ja`, `--disable-extensions-except=${extPath}`, `--load-extension=${extPath}`],
  },
}
