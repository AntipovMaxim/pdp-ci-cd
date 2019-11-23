echo "Lint client"
currentDir=$PWD

cd "$currentDir/$1"
echo "Lint $1"
npm install
npm run lint
