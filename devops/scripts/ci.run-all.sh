if ./devops/scripts/check-target-changes.sh; then ./devops/scripts/ci.run-target.sh; else echo "$TARGET - IS NOT BEING CHANGED"; fi
