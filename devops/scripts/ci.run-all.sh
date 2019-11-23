currentDir=$PWD

DETECT_CHANGES_SCRIPT="$currentDir/devops/scripts/check-target-changes.sh"
RUN_TARGET_SCRIPT="$currentDir/devops/scripts/check-target-changes.sh"

if DETECT_CHANGES_SCRIPT; then RUN_TARGET_SCRIPT; else echo "$TARGET - IS NOT BEING CHANGED"; fi
