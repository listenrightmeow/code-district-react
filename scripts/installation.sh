#!/usr/bin/env bash

nvm install
npm i -g bower grunt-cli
npm i
bower i
brew install md5sha1sum ansible
mkdir secrets
echo "`echo "codedistrict" | md5`" >> secrets/vault-pass.txt
