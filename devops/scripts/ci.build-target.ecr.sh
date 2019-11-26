echo "START PUBLISH -----$1------ TO ECR"

echo "INSTALL AWSCLI"
pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

$(aws ecr get-login --no-include-email --region us-east-2)

currentDir=$PWD

cd "$currentDir/$1"

echo "START BUILDING IMAGE"
docker build -t $1 .

aws ecr get-login

echo "START PUSHING IMAGE"

docker tag $1:latest 933078656705.dkr.ecr.us-east-2.amazonaws.com/$1:latest
docker push 933078656705.dkr.ecr.us-east-2.amazonaws.com/$1:latest

echo "PUBLISHED ----$1---- SUCCESSFULLY TO ECR FINISHED"
