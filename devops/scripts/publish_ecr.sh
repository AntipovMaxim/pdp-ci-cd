echo "START PUBLISH TO ECR"

$(aws ecr get-login --no-include-email --region us-east-2)

currentDir=$PWD

cd "$currentDir/auth-service"
docker build -t pdp-auth-service .

aws ecr get-login

docker tag pdp-auth-service:latest 933078656705.dkr.ecr.us-east-2.amazonaws.com/pdp-auth-service:latest
docker push 933078656705.dkr.ecr.us-east-2.amazonaws.com/pdp-auth-service:latest

echo "PUBLISHED SUCCESS"
