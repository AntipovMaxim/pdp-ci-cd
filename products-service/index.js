/* eslint consistent-return:0 */

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./util/logger');

const { port } = require('./configs/app');
const db = require('./database');
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


// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST;
// const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
