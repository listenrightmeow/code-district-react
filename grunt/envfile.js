const cwd = process.cwd();
const yaml = require('yamljs');

module.exports = (grunt) => {
  grunt.registerTask('envfile', function() {
    const done = this.async();

    let environment = grunt.option('env');
    environment = /^(stag)(e|ing)/.test(environment) ? 'staging' : /^(prod)(uction)?/.test(environment) ? 'production' : /^(dev)(elopment)?/.test(environment) ? 'development' : null;

    if (!environment) {
      grunt.fail.fatal('Grunt: Environment unknown');
    }

    const settings = yaml.load(`${cwd}/secrets/${environment}.yml`);
    const types = ['env', 'json'];
    const envfile = require(`${cwd}/grunt/helpers/envfile.js`)();

    types.forEach((type, idx) => {
      envfile.create({
        config: settings,
        tpl: type
      }, environment);
    });

    done();
  });
}
