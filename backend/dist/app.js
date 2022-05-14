"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const csurf_1 = __importDefault(require("csurf"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const sequelize_1 = require("sequelize");
const routes_1 = __importDefault(require("./routes"));
const { environment } = require("./config");
const isProduction = environment === "production";
const winston_1 = require("./utils/winston");
const winston_2 = __importDefault(require("./utils/winston"));
const testRouter = require("./routes/api/test_models");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', { stream: winston_1.stream }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
if (!isProduction) {
    // enable cors only in development
    app.use((0, cors_1.default)());
    app.use('/test', testRouter);
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: false,
        contentSecurityPolicy: false
    }));
}
else {
    // helmet helps set a variety of headers to better secure your app
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false
    }));
    // Set the _csrf token and create req.csrfToken method
    app.use((0, csurf_1.default)({
        cookie: {
            secure: true,
            sameSite: "lax",
            httpOnly: true,
        },
    }));
}
app.use(routes_1.default); // Connect all the routes
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
    let error;
    // check if error is a Sequelize error:
    if (err instanceof sequelize_1.ValidationError) {
        error = new Error("Validation Error");
        error.errors = err.errors.map((e) => e.message);
        error.title = 'Validation error';
    }
    next(error);
});
// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    winston_2.default.error(`${err.status || 500} - ${err.message} - ${_req.originalUrl} - ${_req.method} - ${_req.ip}`);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});
module.exports = app;
