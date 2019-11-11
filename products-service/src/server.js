/* eslint consistent-return:0 */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { logger } from './util/logger';

import { appConfig } from './config/app.config';
import { connectToDB } from './database';
import apiRoutes from './routes';

const app = express();
connectToDB();

// cors
app.use(cors());


// configure bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Init api routes
app.use(apiRoutes);


// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST;
// const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(appConfig.port, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(appConfig.port, prettyHost);
});
