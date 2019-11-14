export GIT_COMMITTER_EMAIL="travis@travis"
export GIT_COMMITTER_NAME="Travis CI"

git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit

git fetch --all || exit

git checkout master || exit

git merge --no-ff "$TRAVIS_COMMIT" || exit


git push "https://3c7c7f43d99c40bcee68290f7dd7b2aa08fd69f5@github.com/martmax/pdp-ci-cd.git"
