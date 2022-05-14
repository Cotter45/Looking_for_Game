import path from 'path';
const appRoot = path.resolve('logs');
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// define the custom settings for each transport (file, console)
const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const errorFilter = winston.format((info) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info) => {
  return info.level === 'info' ? info : false;
});


// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile({
      level: 'error',
      // @ts-ignore
      filename: `${appRoot}/errors-%DATE%.log`,
      handleExceptions: true,
      colorize: false,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        errorFilter(),
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new DailyRotateFile({
      level: 'info',
      // @ts-ignore
      filename: `${appRoot}/info-%DATE%.log`,
      handleExceptions: true,
      maxSize: '20m',
      maxFiles: '14d',
      colorize: false,
      format: winston.format.combine(
        infoFilter(),
        winston.format.timestamp(),
        winston.format.json()
      ),
    })
  ],
  exitOnError: false, // do not exit on handled exceptions
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new (winston.transports.Console)(options.console));
}

// create a stream object with a 'write' function that will be used by `morgan`
export const stream = {
  write: function(message: string) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      return logger.info(message.trim());
    
  },
};

export default logger;
