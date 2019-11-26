if ./devops/scripts/check-target-changes.sh $1; then ./devops/scripts/ci.build-target.ecr.sh $1; else echo "$1 - IS NOT BEING CHANGED"; fi
