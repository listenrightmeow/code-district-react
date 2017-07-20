const cwd = process.cwd();
const fs = require('fs');
const glob = require('glob');
const spawn = require('child_process').spawnSync;

module.exports = (grunt) => {
  grunt.registerTask('decrypt', function() {
    const done = this.async();

    grunt.log.oklns('task:decrypt');
    glob(`${cwd}/vault/**`, (err, files) => {
      files.forEach((file, idx) => {
        fs.lstat(file, (err, stats) => {
          if (!stats.isDirectory() && !/(vault-pass)/.test(file)) {
            const path = file.replace(cwd, '').replace('/vault/', '');
            const cmd = spawn(`ansible-vault view ${file} --vault-password-file ${cwd}/secrets/vault-pass.txt > ${cwd}/${path}`, [], { cwd:`${cwd}`, shell: true, stdio: 'inherit' });
          }

          if (idx === files.length - 1) {
            done();
          }
        });
      });
    });
  });
};
