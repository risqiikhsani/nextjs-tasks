import { auth } from "@/auth";

const winston = require("winston");
const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");

// Create a Logtail client
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN);

const { combine, timestamp, printf, errors, colorize } = winston.format;



// Define a custom format for pretty CLI logs
const prettyFormat = printf(({ level, message, timestamp, userId, pid, stack, ...meta }) => {
  // Format timestamp to be more readable
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3
  });

  // Format the base log message with userId and process id
  let log = `${formattedTime} [${level}] [userId:${userId || 'N/A'}] [pid:${process.pid}]: ${message}`;

  // Add stack trace if present
  if (stack) {
    log += `\nStack: ${stack}`;
  }

  // Add additional metadata if present
  if (Object.keys(meta).length > 0) {
    log += `\nMeta: ${JSON.stringify(meta, null, 2)}`;
  }

  return log;
});

// Create the logger
const logger = winston.createLogger({
  level: "info",
  format: combine(errors({ stack: true }), timestamp()), // Base format
  transports: [
    // Pretty logs for console
    new winston.transports.Console({
      format: combine(colorize({ all: true }), prettyFormat),
    }),
    // JSON format for Logtail
    new LogtailTransport(logtail),
  ],
});

export default logger

// const { log } = require('@logtail/next');

// export default log