import express, { Express, Request, Response, NextFunction } from "express";
import morgan from 'morgan';
import cors from 'cors';
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ValidationError } from 'sequelize';

import routes from "./routes";
const { environment } = require("./config")
const isProduction = environment === "production";
import { stream } from './utils/winston';
import winston from "./utils/winston";
const testRouter = require("./routes/api/test_models");
  
const app: Express = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream }));

app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  // enable cors only in development
  app.use(cors());

  app.use('/test', testRouter);

  app.use(helmet({
      crossOriginResourcePolicy: false,
      contentSecurityPolicy: false
  }));
} else {
  // helmet helps set a variety of headers to better secure your app
  app.use(helmet({
  contentSecurityPolicy: false
}));
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: true,
        sameSite: "lax",
        httpOnly: true,
      },
    })
  );
}


app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err: ValidationError, _req: Request, _res: Response, next: NextFunction) => {
  let error;
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    error = new Error("Validation Error");
    error.errors = err.errors.map((e: Error) => e.message);
    error.title = 'Validation error';
  }
  next(error);
});

// Error formatter
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500);
  console.error(err);
  winston.error(`${err.status || 500} - ${err.message} - ${_req.originalUrl} - ${_req.method} - ${_req.ip}`);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

export = app;