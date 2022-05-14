"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = void 0;
const path_1 = __importDefault(require("path"));
const appRoot = path_1.default.resolve('logs');
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
// define the custom settings for each transport (file, console)
const options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
const errorFilter = winston_1.default.format((info) => {
    return info.level === 'error' ? info : false;
});
const infoFilter = winston_1.default.format((info) => {
    return info.level === 'info' ? info : false;
});
// instantiate a new Winston Logger with the settings defined above
const logger = winston_1.default.createLogger({
    transports: [
        new winston_daily_rotate_file_1.default({
            level: 'error',
            // @ts-ignore
            filename: `${appRoot}/errors-%DATE%.log`,
            handleExceptions: true,
            colorize: false,
            maxSize: '20m',
            maxFiles: '14d',
            format: winston_1.default.format.combine(errorFilter(), winston_1.default.format.timestamp(), winston_1.default.format.json())
        }),
        new winston_daily_rotate_file_1.default({
            level: 'info',
            // @ts-ignore
            filename: `${appRoot}/info-%DATE%.log`,
            handleExceptions: true,
            maxSize: '20m',
            maxFiles: '14d',
            colorize: false,
            format: winston_1.default.format.combine(infoFilter(), winston_1.default.format.timestamp(), winston_1.default.format.json()),
        })
    ],
    exitOnError: false, // do not exit on handled exceptions
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new (winston_1.default.transports.Console)(options.console));
}
// create a stream object with a 'write' function that will be used by `morgan`
exports.stream = {
    write: function (message) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        return logger.info(message.trim());
    },
};
exports.default = logger;
