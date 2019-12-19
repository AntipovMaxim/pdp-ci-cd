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
- **``` $ npm run start ```** - Run express server that host project sources(`/public`) in development mode with HMR at `http://localhost:3000`;
- **``` $ npm run build ```** - Provide **compiled** bundle to `/public` directory.
- **``` $ npm test ```** - Runs **Unit** tests **once** with Jest. Config file: `./jest.config.js`, with coverage option.
- **``` $ npm run lint ```** - Runs eslint checker **once**. Config file: `.eslintrc`.
- **``` $ npm run clean ```** - Remove 'public' and 'node_modules' folders.


### Production
- **``` $ npm run start:prod ```** - Run app-svc(express app) in prod mode
- **``` $ npm run start:production ```** - Build client and app-svc app for production mode


## CI/СD
### TravisCI
Config file: `.travis.yml`



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
