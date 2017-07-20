const cwd = process.cwd();
const fs = require('fs');
const nunjucks = require('nunjucks');
const Template = class template {
  buildOpts(config) {
    const obj = {};

    for(const key in config) {
      if (config.hasOwnProperty(key)) {
        if (typeof config[key] !== 'string') {
          for(const prop in config[key]) {
            if (config[key].hasOwnProperty(prop)) {
              for(const value in config[key][0]) {
                obj[`${key.toUpperCase()}_${value.toUpperCase()}`] = config[key][0][value];
              }
            }
          }
        } else {
          obj[`${key.toUpperCase()}`] = config[key];
        }
      }
    }

    return obj;
  }
  create(options, environment) {
    const config = this.buildOpts(options.config);
    const tpl = !!options.hasOwnProperty('tpl') ? options.tpl : 'blank';

    this.templateHandler(tpl, config, environment);
  }
  templateHandler(tpl, config, environment) {
    let varFile;
    let data = '';

    const baseDir = `${cwd}/secrets/.generated`;
    const path = `${baseDir}/variables.${tpl}`;
    const njk = `${cwd}/grunt/templates/${tpl}.njk`;
    const props = Object.keys(config);

    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }

    props.forEach((prop, idx) => {
      if (config.hasOwnProperty(prop)) {
        if (/(json)/.test(tpl) && idx === 0) {
          data += '{'
        }

        const ctx = nunjucks.render(njk, { key: prop, prop: config[prop] });
        const lineEnding = (/(json)/.test(tpl) && idx !== props.length - 1) ? ',' : '';
        data += `${ctx}${lineEnding}`;

        if (/(json)/.test(tpl) && idx === props.length - 1) {
          data += '}'
        }
      }
    });

    if (!!fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    fs.writeFileSync(path, data);
  }
}

module.exports = () => {
  return new Template();
}
