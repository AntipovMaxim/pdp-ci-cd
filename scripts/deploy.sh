$(aws ecr get-login --no-include-email --region us-east-2)
docker build -t pdp-ci-cd-aws .
aws ecr get-login
docker tag pdp-ci-cd-aws:latest 933078656705.dkr.ecr.us-east-2.amazonaws.com/pdp-ci-cd-aws:latest
docker push 933078656705.dkr.ecr.us-east-2.amazonaws.com/pdp-ci-cd-aws:latest
