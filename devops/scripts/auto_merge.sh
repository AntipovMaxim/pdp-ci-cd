echo "AUTO_MERGE"

export GIT_COMMITTER_EMAIL="antipov.maxim88@gmail.com"
export GIT_COMMITTER_NAME="Maxim Antipov"

git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit
git fetch --all || exit


git checkout master || exit
git merge --no-ff origin/feature/SJ-165-automerge || exit


git push https://189d7f0ef63aa17bdca9c557a5827906d9cdcf20@github.com/martmax/pdp-ci-cd.git
git push @github.com/">https://189d7f0ef63aa17bdca9c557a5827906d9cdcf20@github.com/martmax/pdp-ci-cd.git

