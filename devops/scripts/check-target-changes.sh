#!/bin/bash

if [[ -z $TRAVIS_COMMIT_RANGE ]]; then
    echo "Commit range cannot be empty"
    exit 1
fi

if [[ -z $TARGET ]]; then
    echo "Change path cannot be empty"
    exit 1
fi

git diff --name-only $TRAVIS_COMMIT_RANGE | sort -u | uniq | grep $TARGET > /dev/null
