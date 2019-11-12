printf '1>>>>>>>>>>>>>.\n'
git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit
git fetch --all || exit

printf '\nb2>>>>>>>>>>>>>>'
git checkout master || exit
git merge --no-ff origin/For-testing || exit

printf '3>>>>>>>>>\n'
git push https://7fbd6d26fa61d3145eaf6aa3b59b483099642c01@github.com/martmax/pdp-ci-cd.git

printf '4>>>>>>>>>>>>n'
