if ./devops/scripts/check-target-changes.sh $1 $2; then ./devops/scripts/ci.run-target.sh $1; else echo "$TARGET - IS NOT BEING CHANGED"; fi
