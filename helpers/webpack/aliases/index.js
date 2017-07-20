const cwd = process.cwd();
const path = require('path');
const fs = require('fs');

module.exports = (root = `${cwd}`, application = 'react') => {
  const projectRoot = path.join(root, 'application');
  const projectScriptDirs = {};
  const getDirectories = (srcpath) => {
    return fs.readdirSync(srcpath).filter((file) => {
      return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
  };

  [application].map((type) => {
    getDirectories(path.join(projectRoot, type)).map((directory) => {
      const key = type === 'stylesheets' ? `stylesheets/${directory}` : directory;
      projectScriptDirs[key] = path.join(projectRoot, type, directory);
      return null;
    });
  });

  return {
    resolveAlias: Object.assign({
      src: projectRoot
    }, projectScriptDirs)
  };
};
