if ./devops/scripts/check-target-changes.sh client; then ./devops/scripts/ci.run-target.lint.sh client; else echo "client app - IS NOT BEING CHANGED"; fi
if ./devops/scripts/check-target-changes.sh auth-service; then ./devops/scripts/ci.run-target.lint.sh auth-service; else echo "auth-service app - IS NOT BEING CHANGED"; fi
if ./devops/scripts/check-target-changes.sh products-service; then ./devops/scripts/ci.run-target.lint.sh products-service; else echo "products-service app - IS NOT BEING CHANGED"; fi
