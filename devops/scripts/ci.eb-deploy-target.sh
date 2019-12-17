#!/bin/bash

echo "INSTALL AWSCLI"
pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

echo "LOGIN TO AWS"
$(aws ecr get-login --no-include-email --region us-east-2)
aws ecr get-login

target="$1"
currentDir="$PWD"
appPath="$currentDir/$1"
file="$appPath/Dockerrun.aws.json"
currentTag=`aws elasticbeanstalk describe-environments --application-name "pdp-ci-cd-$target" --environment-name "pdp-ci-cd-$target-env" --query "Environments[*].VersionLabel" --output text`
echo "$currentTag"
IFS='-' read -r -a array <<< "$currentTag"
currentVersion="${array[1]}"
nextVersion=$(($currentVersion + 1))
tag="version-$nextVersion"
s3Bucket="elasticbeanstalk-us-east-2-294808553613"
s3Path="$target/$tag/"
fileName="Dockerrun.aws.json"
s3Key="$s3Path$fileName"


echo "BUILD AND PUSH IMAGE TO DOCKER HUB"
./ci.build-target.docker-hub.sh $target

echo "COPY TO S3"
aws s3 cp $file s3://$s3Bucket/$s3Path

echo "create-application-version"
aws elasticbeanstalk create-application-version \
    --application-name pdp-ci-cd-$target \
    --version-label "$tag" \
    --source-bundle "{\"S3Bucket\":\"$s3Bucket\",\"S3Key\":\"$s3Key\"}"


# Deploy to stage
echo "DEPLOY"
aws elasticbeanstalk update-environment \
    --environment-name "pdp-ci-cd-$target-env" \
    --version-label "$tag"


echo "POLLING"
# Polling to see whether deploy is done
deploystart=$(date +%s)
timeout=3000 # Seconds to wait before error
threshhold=$((deploystart + timeout))
while true; do
    # Check for timeout
    timenow=$(date +%s)
    if [[ "$timenow" > "$threshhold" ]]; then
        echo "Timeout - $timeout seconds elapsed"
        exit 1
    fi

    # See what's deployed
    version=`aws elasticbeanstalk describe-environments --application-name "pdp-ci-cd-$target" --environment-name "pdp-ci-cd-$target-env" --query "Environments[*].VersionLabel" --output text`
    status=`aws elasticbeanstalk describe-environments --application-name "pdp-ci-cd-$target" --environment-name "pdp-ci-cd-$target-env" --query "Environments[*].Status" --output text`

    if [ "$version" != "$tag" ]; then
        echo "Tag not updated (currently $version). Waiting."
        sleep 10
        continue
    fi
    if [ "$status" != "Ready" ]; then
        echo "System not Ready -it's $status. Waiting."
        sleep 10
        continue
    fi
    break
done




