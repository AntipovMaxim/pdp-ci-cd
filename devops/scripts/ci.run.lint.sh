if ./build-condition.sh $TRAVIS_COMMIT_RANGE $TARGET; then ./ci.lint.split.sh $TARGET; else echo "$TARGET is NOT being built"; fi
