const cwd = process.cwd();
const webpack = require('webpack');
const config = require(`${cwd}/webpack/staging.config.js`);

delete config.devServer;

config.module.rules.forEach((rule, idx) => {
  if (rule.hasOwnProperty('loader') && rule.loader === 'source-map-loader') {
    config.module.rules.splice(idx, 1);
  }
})

module.exports = config;
