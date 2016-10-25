const winston = require('winston');

module.exports = (options, imports, register) => {
    const logger = new winston.Logger({
        transports: [
            new (winston.transports.Console)({
                level: process.env.LOGGER_DEFAULT_LOG_LEVEL,
                colorize: true,
                timestamp: true
            })
        ]
    });
    logger.cli();
    register(null, { logger });
};
