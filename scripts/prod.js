const fs = require('fs')
const packageName = require('../package.json').name
const path = require('path')
const rimraf = require('rimraf')
const shell = require('shelljs')
rimraf.sync(path.resolve(__dirname, '../build/prod'), {})
rimraf.sync(path.resolve(__dirname, `../dist/${packageName}.crx`), {})
shell.exec('standard')
shell.exec('standard --parser typescript-eslint-parser --plugin typescript *.ts *.tsx')
shell.exec('webpack --config ./webpack/prod.config.js --progress --colors')
const pem = fs.existsSync(path.resolve(__dirname, '../pem/key.pem')) ? '-p pem/key.pem' : ''
shell.exec(`crx pack build/prod -o dist/${packageName}.crx ${pem}`)
