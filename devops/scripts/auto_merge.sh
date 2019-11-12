echo "AUTO_MERGE"
git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit
git fetch --all || exit


git checkout master || exit
git merge --no-ff origin/feature/SJ-165-automerge || exit


git push https://7fbd6d26fa61d3145eaf6aa3b59b483099642c01@github.com/martmax/pdp-ci-cd.git

