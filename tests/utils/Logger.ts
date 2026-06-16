import winston from "winston";

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

export const Logger = winston.createLogger({
  level: "info", // Set default log level (info, debug, warn, error)
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    // Output to Console
    new winston.transports.Console(),
    // Output to File
    new winston.transports.File({ filename: "logs/test-execution.log" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" })
  ]
});
