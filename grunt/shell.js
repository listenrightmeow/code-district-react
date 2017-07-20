const cwd = process.cwd();
const execSync = require('child_process').execSync;
const grunt = require('grunt');
const env = (env) => {
  const environment = /^(stag)(e|ing)/.test(env) ? 'staging' : /^(prod)(uction)?/.test(env) ? 'production' : /^(dev)(evelopment)?/.test(env) ? 'development' : null;

  if (!environment) {
    grunt.fail.fatal('Grunt: Environment unknown');
  } else {
    return environment;
  }
}

module.exports = {
  decrypt: {
    command: () => {
      const environment = env(grunt.option('env'));

      return `ansible-vault view ${cwd}/vault/${environment}.yml --vault-password-file ${cwd}/secrets/vault-pass.txt > ${cwd}/secrets/${environment}.yml`;
    }
  },
  webpack: {
    'command': () => {
      const environment = env(grunt.option('env'));

      if (environment === 'development') {
        return `node_modules/.bin/webpack-dev-server --config webpack/${environment}.config.js --colors`
      } else {
        return `NODE_ENV=${environment} webpack --config webpack/${environment}.config.js -p`;
      }
    }
  }
};
