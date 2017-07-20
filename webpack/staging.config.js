const cwd = process.cwd();
const config = require(`${cwd}/webpack/development.config.js`);

config.resolve.alias = Object.assign({}, config.resolve.alias, {
  react: 'react-lite',
  'react-dom': 'react-lite',
});

module.exports = config;
