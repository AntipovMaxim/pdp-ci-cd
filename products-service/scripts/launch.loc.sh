#!/usr/bin/env bash

currDir=$PWD

envFile="$currDir/configs/local.env"

echo $currDir

./node_modules/.bin/env-cmd -f $envFile && nodemon ./index.js


