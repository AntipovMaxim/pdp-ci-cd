currentDir=$PWD

cd "$currentDir/$TARGET"

echo "INSTALL $TARGET"
npm install

echo "LINT $TARGET"
npm run lint

echo "TEST $TARGET"
npm run test
