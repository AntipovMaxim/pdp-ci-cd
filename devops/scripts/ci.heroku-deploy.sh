echo "START PUBLISH -----$1------ TO HEROKU"

echo "INSTALL HEROKU"
npm install -g heroku

echo "HEROKU VERSION"
heroku --version


echo "HEROKU LOGIN"
heroku login

currentDir=$PWD

cd "$currentDir/$1"

echo "START BUILDING IMAGE"
docker build -t $1 .
docker build -t registry.heroku.com/pdp-ci-cd-$1/web .


echo "START PUSHING IMAGE"

docker push registry.heroku.com/pdp-ci-cd-$1/web

echo "START DEPLOYING IMAGE"
heroku container:release web -a pdp-ci-cd-$1


echo "PUBLISHED ----$1---- SUCCESSFULLY TO HEROKU FINISHED"
