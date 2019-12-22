# PDP CI/CD Products server app [![Build Status](https://travis-ci.com/martmax/pdp-ci-cd.svg?branch=master)](https://travis-ci.com/martmax/pdp-ci-cd)

RESTFull web application for managing products.
 - based on  [Express.js](https://expressjs.com/) technology stack;
 - auth based on [JWT](https://jwt.io/)
 - for database used [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)
 - for documentation used [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)


## Setup
### Requirements
``` 
$ node -v ^10.16.0
$ npm -v ^6.9.0
```

### Installation
```
$ git clone https://github.com/martmax/pdp-ci-cd.git
$ cd pdp-ci-cd/products-service
$ npm install
$ npm start
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:4000
```

## Environments
*name* | *url* |
--- | --- 
Dev | [https://pdp-ci-cd-auth-service.herokuapp.com](https://pdp-ci-cd-auth-service.herokuapp.com/)
Prod | [http://pdp-ci-cd-auth-service.us-east-2.elasticbeanstalk.com/](http://pdp-ci-cd-auth-service.us-east-2.elasticbeanstalk.com/)


## API
*name* | *url*  | documentation | description
--- | --- | --- | ---
Identity server | `https://pdp-ci-cd-auth-service.herokuapp.com` | [swagger link](https://pdp-ci-cd-auth-service.herokuapp.com/api-doc) | pool of endpoints for managing user identity
Products server | `https://pdp-ci-cd-products-service.herokuapp.com` | [swagger link](https://pdp-ci-cd-products-service.herokuapp.com/api-doc) | pool of endpoints for managing products


## Commands
### Development
- **``` $ npm run launch:dev ```** - Run express server in development mode at `http://localhost:5000`;
- **``` $ npm run start ```** - alias for `npm run launch:dev`;
- **``` $ npm run lint ```** - Runs eslint checker **once**. Config file: `.eslintrc`.
- **``` $ npm run lint:fix ```** - run `npm run lint` with `--fix` option;
- **``` $ npm run clean ```** - Remove 'build' folder.


### Production
- **``` $ npm run start:prod ```** - Run express server in prod mode


### Docker
By default, the Docker will expose port 5000, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd auth-service
docker build -t <youruser>/products-service .
```

This will create the client image and pull in the necessary dependencies.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 5000 of the host to port 3000 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 4000:4000 --restart="always" --env-file ./enviroment/local.env <youruser>/products-service:latest
```
or

```sh
docker-compose up
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:4000
```

## Folder/files structure
- **/enviroment** - enviroment variables
     - **local.env** - enviroment variables for local development
- **/src** - source code
     - **/config** - root application configs
         - **app.config** - root config where PORT, APP HOST, DATABASE HOST is setted...
     - **/controllers** - all application controllers
         - **/products** - products controllers
             - **....**
             - **index.js**
         - **index.js** export file for all controllers
     - **/database**
         - **index.js** - database connection functionality
     - **/middlewares**  - all application middlewares
         - **verify-token.middleware.js** - middleware for verifying `jwt` token
         - **index.js**
     - **/models** - mongoose models, schemas
         - **users.model.js** - model for users  
         - **index.js** export file for all models
     - **/routes** - configuration for app routes
         - **/api** - api routes configuration
             - **products.routes.js** - auth routing
             - **index.js** - export file for all api routes
         - **index.js** - root routes config    
     - **/utils** - helper functions, controllers, etc...
- **/docker** - docker configurations
    - **Dockerfile** - build image configuration
    - **docker-compose.yaml** - to combine service with mongoDB locally 
    - **Dockerrun.aws.json**  - configuration file for deploy to AWS Elastic Beanstalk                  
- **package.json** - component meta file (default for js environment)

#### Error handling code style
##### BaseController class
 for writing route handlers(controllers) should extend `BaseController` class which provide such methods:
    - **jsonResponse(){}**
    - **success(){}**
    - **created(){}**
    - **clientError(){}**
    - **unauthorized(){}**
    - **forbidden(){}**
    - **notFound(){}**
    - **validationError(){}**
    - **mongoFail(){}**
    - ....

## Contribution
Before push commit make sure that all modules are added in package.json


### Code standard
#### Common (es2015)
- [`AirBnb code style`](https://github.com/airbnb/javascript)

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

- [`#Express.js`](https://expressjs.com/) [`#ES6`](http://www.ecma-international.org/ecma-262/6.0/)[`#axios`](https://github.com/axios/axios) 
- [`#MongoDB`](https://www.mongodb.com/) [`#Mongoose`](https://mongoosejs.com/)
- [`#Webpack4`](https://webpack.github.io) [`#Babel`](https://babeljs.io)
- [`#ESLInt`](https://eslint.org/)
- [`#REST`](https://en.wikipedia.org/wiki/Representational_state_transfer)
- [`#swagger-ui-express`](https://www.npmjs.com/package/swagger-ui-express)
