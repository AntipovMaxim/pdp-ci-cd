echo "Branch: $TRAVIS_BRANCH"
echo "Pull request: $TRAVIS_PULL_REQUEST"

if [ "$TRAVIS_BRANCH" == "master" ]; then
    echo "START Publish for $1 to DOCKER HUB"

    currentDir=$PWD

    docker login -u="$DOCKER_HUB_USERNAME" -p="$DOCKER_HUB_PASSWORD" || exit 1

    cd "$currentDir/$1"

    echo "Start building $1 image"
    docker build -t $DOCKER_HUB_USERNAME/$1 .

    echo "Start publish $1 image to docker"
    docker push $DOCKER_HUB_USERNAME/$1 || exit 1
    fi
