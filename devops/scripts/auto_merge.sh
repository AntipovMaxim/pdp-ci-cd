echo "AUTO_MERGE"

export GIT_COMMITTER_EMAIL="antipov.maxim88@gmail.com"
export GIT_COMMITTER_NAME="Maxim Antipov"

git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit
git fetch --all || exit


git checkout master || exit
git merge --no-ff origin/feature/SJ-165-automerge || exit


git push https://cc262b1bd826b79ea8577ee195f5bb935acbc1c2@github.com/martmax/pdp-ci-cd.git

