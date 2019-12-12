#!/bin/bash

repo="anmax88/client"
tag="master-v8"
file="Dockerrun.aws.json"
s3Bucket="elasticbeanstalk-us-east-2-294808553613"
s3Path="app/$tag/"
s3Key="$s3Path$file"


echo "BUILD IMAGE"
docker build -t $repo .

echo "PUSH IMAGE"
docker push $repo

echo "COPY TO S3"
aws s3 cp $file s3://$s3Bucket/$s3Path

echo "create-application-version"
aws elasticbeanstalk create-application-version \
    --application-name pdp-ci-cd-client \
    --version-label "$tag" \
    --source-bundle "{\"S3Bucket\":\"$s3Bucket\",\"S3Key\":\"$s3Key\"}"


# Deploy to stage
echo "DEPLOY"
aws elasticbeanstalk update-environment \
    --environment-name "PdpCiCdClient-env" \
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
    version=`aws elasticbeanstalk describe-environments --application-name "pdp-ci-cd-client" --environment-name "PdpCiCdClient-env" --query "Environments[*].VersionLabel" --output text`
    status=`aws elasticbeanstalk describe-environments --application-name "pdp-ci-cd-client" --environment-name "PdpCiCdClient-env" --query "Environments[*].Status" --output text`

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




