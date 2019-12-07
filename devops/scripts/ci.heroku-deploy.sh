#! /bin/bash

function deployApps() {
   arr=("$@")
   for i in "${arr[@]}";
      do
          if ./devops/scripts/check-target-changes.sh $i; then ./devops/scripts/ci.heroku-deploy-target.sh $i; else echo "$i app - IS NOT BEING CHANGED"; fi
      done

}

IFS='/' read -r -a apps <<< "$APPS"

deployApps "${apps[@]}"
