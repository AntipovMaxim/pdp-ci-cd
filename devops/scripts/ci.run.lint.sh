if ./devops/scripts/build-condition.sh; then ./devops/scripts/ci.lint.split.sh; else echo "$TARGET is NOT being built"; fi
