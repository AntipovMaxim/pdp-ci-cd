echo "Lint client"

cd ./client
npm run lint

echo "Lint products-service"

cd ./products-service
npm run lint

echo "Lint auth-service"

cd ./auth-service
npm run lint
