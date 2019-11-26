if ./devops/scripts/check-target-changes.sh $1; then ./devops/scripts/ci.build.docker.hub.sh $1; else echo "$1 - IS NOT BEING CHANGED"; fi
