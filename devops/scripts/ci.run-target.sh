currentDir=$PWD

cd "$currentDir/$1"

echo "INSTALL $1"
npm install

echo "LINT $1"
npm run lint

echo "TEST $1"
npm run test
