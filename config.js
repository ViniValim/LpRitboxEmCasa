const path = require('path');
const srcPath = path.resolve(__dirname, 'src');
const { argv } = require('yargs');
const devMode = argv.mode && argv.mode != 'production';

module.exports = {
  devMode: devMode,
  filename: devMode ?  '[name]' : '[name].[hash:8]',
  chunkFilename: devMode ? '[id]' : '[id].[hash:8]',
  manifest: {},
  paths: {
    src: srcPath,
    root: path.resolve(__dirname, ''),
    assets: path.join(srcPath, 'assets'),
    dist: path.join(srcPath, 'dist'),
    build: path.join(srcPath, 'build')
  }
};
