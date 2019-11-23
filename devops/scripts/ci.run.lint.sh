if ./devops/scripts/build-condition.sh $TRAVIS_COMMIT_RANGE $TARGET; then ./devops/scripts/ci.lint.split.sh $TARGET; else echo "$TARGET is NOT being built"; fi
