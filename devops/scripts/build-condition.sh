#!/bin/bash

echo "Commit range - $TRAVIS_COMMIT_RANGE $1"
echo " Target -  $TARGET $2"

if [[ -z $TRAVIS_COMMIT_RANGE ]]; then
    echo "Commit range cannot be empty"
    exit 1
fi

if [[ -z $TARGET ]]; then
    echo "Change path cannot be empty"
    exit 1
fi



if [ git diff --name-only $TRAVIS_COMMIT_RANGE | sort -u | uniq | grep $TARGET > /dev/null ]; then
  echo "$TARGET BUILLLLLLLLLDDDDDDDDD"
else
  echo "$TARGET NOOOOOOOT BUILLLLLLLLLDDDDDDDDD"
fi

