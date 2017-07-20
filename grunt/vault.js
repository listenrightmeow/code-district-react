const cwd = process.cwd();
const fs = require('fs');
const glob = require('glob');
const spawn = require('child_process').spawnSync;

module.exports = (grunt) => {
  grunt.registerTask('vault', function() {
    const done = this.async();

    grunt.log.oklns('task:vault');
    glob(`${cwd}/vault/**`, (err, files) => {
      files.forEach((file, idx) => {
        fs.lstat(file, (err, stats) => {
          if (!stats.isDirectory() && !/(vault-pass)/.test(file)) {
            const cmd = spawn(`ansible-vault encrypt ${file} --vault-password-file ${cwd}/secrets/vault-pass.txt`, [], { cwd:`${cwd}`, shell: true, stdio: 'inherit' });
          }

          if (idx === files.length - 1) {
            done();
          }
        });
      });
    });
  });
};
