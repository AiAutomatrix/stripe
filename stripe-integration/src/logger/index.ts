import { createLogger, format, transports } from 'winston';

// Define your log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Create the logger instance
const logger = createLogger({
  level: 'info', // Set the minimum logging level
  format: logFormat,
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'logs/combined.log' }) // Log all messages to a file
  ]
});

// A helper function to log messages
const log = {
  info: (message: string) => logger.info(message),
  warn: (message: string) => logger.warn(message),
  error: (message: string) => logger.error(message),
  debug: (message: string) => logger.debug(message),
};

export default log;
