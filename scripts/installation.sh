#!/usr/bin/env bash

nvm install
npm i -g bower grunt-cli
brew install md5sha1sum
mkdir secrets
echo "`echo "codedistrict" | md5`" >> secrets/vault-pass.txt
