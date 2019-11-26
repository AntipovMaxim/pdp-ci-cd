import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { logger } from './utils/logger';
import { appConfig } from './config/app.config';
import apiRoutes from './routes';
import { connectToDB } from './database';
import swaggerDocument from './swagger-config.json';

// Initiate our app
const app = express();

// Configure swagger!!
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configure our app
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: appConfig.secret, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false,
}));

// Connect to DB!!
connectToDB();

// Configure Mongoose
mongoose.set('debug', true);

// Init Routes
app.use(apiRoutes);


// Errors handling
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {},
  }));
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST;
// const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app!
app.listen(appConfig.port, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  return logger.appStarted(appConfig.port, prettyHost);
});
