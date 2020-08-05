const sass = require('sass');

module.exports = (data, filename) => {
  if (!filename.endsWith('module.scss')) return '';
  return sass.renderSync({ file: filename }).css.toString('utf8');
};
