const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { ValidationError } = require("sequelize");

const routes = require("./routes");
const { environment } = require("./config");
const isProduction = environment === "production";
const winston = require('./utils/winston');
const testRouter = require("./routes/api/test");
  
const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: winston.stream }));

app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  // enable cors only in development
  app.use(cors());
  app.use('/test', testRouter);
}

// helmet helps set a variety of headers to better secure your app
app.use(helmet({
  contentSecurityPolicy: false
}));

app.use("/static", express.static(path.join(__dirname, 'public')));

// Set the _csrf token and create req.csrfToken method
if (isProduction) {
  app.use(
    csurf({
      cookie: {
        secure: true,
        sameSite: "Lax",
        httpOnly: true,
      },
    })
  );
}

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
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

module.exports = app;