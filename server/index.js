/* eslint consistent-return:0 */

const express = require('express');
const { resolve } = require('path');
const bodyParser = require('body-parser');
const logger = require('./util/logger');

const argv = require('./util/argv');
const { port } = require('./configs/app');
const db = require('./database');
const setup = require('./middlewares/frontendMiddleware');
const productRoutes = require('./routes/products');

const app = express();
db();


// configure bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// initialise express router
const router = express.Router();
// use express router
app.use('/api', router);
// call product routing
productRoutes(router);


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
// const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
