const path = require('path');

const cssnanoConfig = {
  preset: ['default', { discardComments: { removeAll: false } }]
};

module.exports = ({ file, options }) => {
  return {
    ident: 'postcss',
    // parser: !options.devMode ? 'postcss-safe-parser' : undefined,
    parser: undefined,
    plugins: {
      'autoprefixer': true,
      'cssnano': true
    }
  };
}