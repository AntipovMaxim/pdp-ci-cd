
echo "Commit range - $TRAVIS_COMMIT_RANGE"
echo " Target -  $TARGET"

if [ -z $TRAVIS_COMMIT_RANGE ]; then
    echo "Commit range cannot be empty"
    exit 1
fi

if [ -z $TARGET ]; then
    echo "Change path cannot be empty"
    exit 1
fi

CHANGED_FILES=($(git diff --name-only $TRAVIS_COMMIT_RANGE))

echo CHANGED_FILES



if [[ git diff --name-only $TRAVIS_COMMIT_RANGE | sort -u | uniq | grep $TARGET > /dev/null ]]; then
  echo "$TARGET BUILLLLLLLLLDDDDDDDDD"
else
  echo "$TARGET NOOOOOOOT BUILLLLLLLLLDDDDDDDDD"
fi

