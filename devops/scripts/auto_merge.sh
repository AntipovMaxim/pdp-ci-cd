echo "AUTO_MERGE"

export GIT_COMMITTER_EMAIL="antipov.maxim88@gmail.com"
export GIT_COMMITTER_NAME="Maxim Antipov"

git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit
git fetch --all || exit


git checkout master || exit
git merge --no-ff origin/feature/SJ-165-automerge || exit


git push https://dddd:github.com/martmax/pdp-ci-cd.git
export GIT_COMMITTER_EMAIL="travis@travis"
export GIT_COMMITTER_NAME="Travis CI"

git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit

git fetch --all || exit

git checkout master || exit

git merge --no-ff "$TRAVIS_COMMIT" || exit

git push "https://$GITHUB_SECRET_TOKEN@github.com/martmax/pdp-ci-cd.git"
