# PDP CI/CD Microservices  [![Build Status](https://travis-ci.com/martmax/pdp-ci-cd.svg?branch=master)](https://travis-ci.com/martmax/pdp-ci-cd)

## CI/СD
### TravisCI
Config file: `.travis.yml`

**Process**
	1. When pull request created the test and linting runs on TravisCI VM;
	2. Github check status of `Travis CI - Pull request`;
	3. After the build is green and we have enough approves pull request will merged automatically;
	4. After pull request is merged to master TravisCI VM build image and push to DOCKER HUB latest version;
	5. After image is pushed successfully start running deploy to dev env (heroku service) and prod env (AWS)


**Travis CI configuration**
	1. We have to set `Build pushed branches` option to `ON` ([documentation](https://docs.travis-ci.com/user/web-ui/#build-pushed-branches))
	2. We have to set `Build pushed pull requests` option to `ON` ([documentation](https://docs.travis-ci.com/user/web-ui/#build-pushed-pull-requests))

**Travis CI ENV variables**	
*name* | *evs*  | documentation | short description
--- | --- | --- | ---
Docker hub | `DOCKER_HUB_PASSWORD`, `DOCKER_HUB_USERNAME` | [link](https://hub.docker.com/) | sign in credentials to docker hub
Github | `GITHUB_SECRET_TOKEN` | [link](https://github.com/settings/tokens) | have to generate token for repository access
Heroku | `HEROKU_API_KEY`, `HEROKU_CREDENTIALS_EMAIL`, `HEROKU_CREDENTIALS_PASSWORD` | [link](https://devcenter.heroku.com/articles/authentication) | should generate an API key that allows me to use the Heroku API
AWS | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION` | [link](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) | should create iam user with admin polices and `Access Key ID`, `Secret Access Key`


### CI build scripts
go to  -> cd  `devops/scripts`

- **``` $ ./auto_merge.sh ```** - automatically merged PR to master after all jobs pass successfully
- **``` $ ./check-target-changes.sh ```** - check if some project was changed or not (take one argument `${project name}`)
- **``` $ ./ci.build-target.docker-hub.sh ```** - build and push current project to `Docker hub` (take one argument `${project name}`)
- **``` $ ./ci.eb-deploy-target.sh ```** - deploy current project to AWS Elastic BeanStalk (take one argument `${project name}`)
- **``` $ ./ci.heroku-deploy-target.sh ```** - push and deploy current project to Heroku (take one argument `${project name}`)
- **``` $ ./ci.build-target.ecr.sh ```** - build and push current project to `AWS ECR` (take one argument `${project name}`)
- **``` $ ./ci.run-target.lint.sh ```** - run linter for current project (take one argument `${project name}`)
- **``` $ ./ci.run-target.test.sh ```** - run tests for current project (take one argument `${project name}`)
	

## Contribution
Before push commit make sure that all modules are added in package.json

### development flow

- **SubTask*** is Open
	1. Move Jira ticket to ***in progress*** status _(ex. SJ-587)_;
	2. Shortly discuss with the UX specialist story wireframes;
	3. Shortly discuss with me or another colleagues about implementation;
	4. Create feature branch **`feature/${projectKey}-${ticketNumber}`**  _(ex. **feature/SJ-531**)_ from **master**

- **SubTask*** is done on your local branch
	0. Pull actual state of **master** branch;
	1. Check test cases from TestRails;
	2. Check functionality and interface behavior with UX specialist;
	3. Create merge request on **master** branch;
	4. Move Jira ticket to ***code review*** status;
	5. Wait for **code review process**** from colleagues;
	6. Resolve review and accept merge request.

- **SubTask*** is on *master branch* and deploed on *develop environment*
	1. Move Jira ticket to ***done*** status;

- in case when **SubTask** is the last development ticket in the Story.
	1. Move Story to **ready to test** status and reassign to QA engineer which assigned to `[QA]` subTask.

`*`: It is sub task of main Jira Story which marked by `[FE]` prefix;

`**`: **Code review process**

- Code review process
	1. Opened merge it is **high priority** for another **developers**
	2. Review code of your colleague
	3. Send comment if you have
	4. Leave 'Like' on merge request, if your comments resolves or you do not have any questions
	5. After 2 'Likes' from colleagues, you can accept merge request.


### git branching strategy - (Trunk based development)
![Git branching stategy](https://uploads.toptal.io/blog/image/129304/toptal-blog-image-1551794413174-f4139c4be533dc592d49f9a0bcc330f0.png)

