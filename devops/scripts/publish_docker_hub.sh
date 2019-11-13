echo "Branch: $TRAVIS_BRANCH"
echo "Pull request: $TRAVIS_PULL_REQUEST"

if [ "$TRAVIS_BRANCH" == "master" ]; then
    echo "Publish for Products-service to DOCKER HUB started..."

    currentDir=$PWD
    echo "Current directory $currentDir"

    docker login -u="$DOCKER_HUB_USERNAME" -p="$DOCKER_HUB_PASSWORD" || exit 1

    cd "$currentDir/products-service"

    echo "Start building products-service image"
    docker build -t $DOCKER_HUB_USERNAME/pdp-products-service .

    echo "Start publish products-service image to docker"
    docker push $DOCKER_HUB_USERNAME/pdp-products-service || exit 1
    fi
