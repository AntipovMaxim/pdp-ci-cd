currentDir=$PWD

cd "$currentDir/$1"

echo "INSTALL $1"
npm install

echo "TEST $1"
npm run test
