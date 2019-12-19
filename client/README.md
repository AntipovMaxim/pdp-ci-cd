# PDP CI/CD client app [![Build Status](https://travis-ci.com/martmax/pdp-ci-cd.svg?branch=master)](https://travis-ci.com/martmax/pdp-ci-cd)

RESTFull web application.
 - based on  [React](https://facebook.github.io/react/)/[Express.js](https://expressjs.com/) technology stack;
 - integrated with Node.js-based servers.


## Setup
### Requirements
``` 
$ node -v ^10.16.0
$ npm -v ^6.9.0
```

### Installation
```
$ git clone https://github.com/martmax/pdp-ci-cd.git
$ cd pdp-ci-cd/client
$ npm install
$ npm start
```

## Environments
*name* | *url* |
--- | --- 
Dev | [https://pdp-ci-cd-client.herokuapp.com/](https://pdp-ci-cd-client.herokuapp.com/)
Prod | [http://pdp-ci-cd-client.us-east-2.elasticbeanstalk.com/](http://pdp-ci-cd-client.us-east-2.elasticbeanstalk.com/)


## API
*name* | *url*  | documentation | description
--- | --- | --- | ---
Identity server | `https://pdp-ci-cd-auth-service.herokuapp.com` | [swagger link](https://pdp-ci-cd-auth-service.herokuapp.com/api-doc) | pool of endpoints for managing user identity
Products server | `https://pdp-ci-cd-products-service.herokuapp.com` | [swagger link](https://pdp-ci-cd-products-service.herokuapp.com/api-doc) | pool of endpoints for managing products


## Commands
### Development
- **``` $ npm run start ```** - Run express server that host project sources(`/build`) in development mode with HMR at `http://localhost:3000`;
- **``` $ npm run build ```** - Provide **compiled** bundle to `/build` directory.
- **``` $ npm test ```** - Runs **Unit** tests **once** with Jest. Config file: `./jest.config.js`, with coverage option.
- **``` $ npm run lint ```** - Runs eslint checker **once**. Config file: `.eslintrc`.
- **``` $ npm run clean ```** - Remove 'build' and 'node_modules' folders.


### Production
- **``` $ npm run start:prod ```** - Run app-svc(express app) in prod mode
- **``` $ npm run start:production ```** - Build client and app-svc app for production mode


### Docker
By default, the Docker will expose port 3000, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd client
docker build -t <youruser>/client .
```

This will create the client image and pull in the necessary dependencies.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 3000 of the host to port 3000 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" --env-file ./enviroment/local.env <youruser>/client:latest
```
or

```sh
docker-compose up
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```


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

### Code standard
#### Common (es2015, React, Sass)
- [`AirBnb code style`](https://github.com/airbnb/javascript)
- [`React hooks`](https://reactjs.org/docs/hooks-intro.html)

#### useReducer hook code style
##### Types

A single type must be a string.
Type string  should consist information about `action` (GET, SET, ...) and entity to which this action influences.
`  GET_PRODUCTS_REQUEST: 'HOME/get products request',
   GET_PRODUCTS_SUCCESS: 'HOME/get products success',
   GET_PRODUCTS_FAILURE: 'HOME/get products failure',`

##### Actions
An action MUST

- be a plain JavaScript object.
- have a `type` property.

An action MAY

- have a `error` property.
- have a `payload` property.
- have a `meta` property.

An action MUST NOT include properties other than `type`, `payload`, and `error`, and `meta`.

**type**

The `type` of an action identifies to the consumer the nature of the action that has occurred. Two actions with the same `type` MUST be strictly equivalent (using `===`). By convention, `type` is usually string constant or a Symbol.

**payload**

The optional payload property MAY be any type of value. It represents the payload of the action. Any information about the action that is not the type or status of the action should be part of the payload field.

By convention, if error is true, the payload SHOULD be an error object. This is akin to rejecting a promise with an error object.

**error**

The optional error property MAY be set to true if the action represents an error.

An action whose error is true is analogous to a rejected Promise. By convention, the payload SHOULD be an error object.

If error has any other value besides true, including undefined and null, the action MUST NOT be interpreted as an error.

**meta**

The optional `meta` property MAY be any type of value. It is intended for any extra information that is not part of the payload.

### WebStorm configuration

1. Open **Preferences**
2. Go to **Editor** > **Code Style**
3. Open **Schema** preferences
4. Click on **Import Scheme** > **Intellij IDEA code style XML** (http://take.ms/f8dyS)
5. Select file `webstorm.config.xml`
6. You can create new (or mark *Cureent schema* chackbox to copy into current) and press **OK**
7. Then you can use **Menu** > **Code** > **Reformat Code** (macOS shortcut `cmnd` + `option/alt` + `L` )
8. Check "Ensure line feed at file end on Save" (**Editor** > **General**, section 'Other')


## Stack  
- [`#React`](https://facebook.github.io/react/) [`#ES6`](http://www.ecma-international.org/ecma-262/6.0/)[`#axios`](https://github.com/axios/axios) 
- [`#Webpack4`](https://webpack.github.io) [`#Babel`](https://babeljs.io)
- [`#Jest`](https://jestjs.io/)
- [`#REST`](https://en.wikipedia.org/wiki/Representational_state_transfer)
