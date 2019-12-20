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

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
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
- **``` $ npm run clean ```** - Remove 'build' folder.


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
docker run -d -p 3000:3000 --restart="always" --env-file ./enviroment/local.env <youruser>/client:latest
```
or

```sh
docker-compose up
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```

## Folder/files structure
- **/enviroment** - enviroment variables
     - **local.env** - enviroment variables for local development
- **/app** - client source code
    - **/core** - core app functionality
         - **/config** - root configuration
              - **apiConfig** - api urls
         - **/providers** - root app providers
              - **AuthProvider.js** - auth provider
         - ....
     - **/modules** - modules that contain all functionality in one place    
          - **/auth** - auth module
              - **/api** - configuration for working with api (http request)
                  - **index.js**
              - **/components** - all modules components
                  - **/auth-page**
                       - **/tests** - tests for current component
                           - **index.test.js**
                       - **AuthPage.js** - auth page component
                       - **styles.scss** - styles for this component    
               - **/hooks** - React hooks that used in current module
               - **Loadable.js** - asynchronously loads the component for HomePage   
               - **index.js** - export file       
           - .... other modules
     - **/shared** - shared(common) app functionality
         - **/components**                
         - **/hooks**                
         - **/services**                
         - **/utils**
     - **/styles** - global styles
     - **/build** - bundled source code                    
- **/config** - root application configs(jest, webpack ...)
         - **jest.config.js** - configuration for jest test framework
         - ....
- **/docker** - docker configurations
    - **Dockerfile** - build image configuration
    - **docker-compose.yaml** - to combine service with mongoDB locally 
    - **Dockerrun.aws.json**  - configuration file for deploy to AWS Elastic Beanstalk 
- **/ap-svc** - simple express server that serve static files                     
- **package.json** - component meta file (default for js environment).


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
