/* eslint consistent-return:0 */

const express = require('express');
const { resolve } = require('path');
const logger = require('./util/logger');

const { port } = require('./configs/app');
const setup = require('./middlewares/frontendMiddleware');

const app = express();

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

const prettyHost = process.env.HOST || 'localhost';

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
