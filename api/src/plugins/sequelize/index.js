const Sequelize = require('sequelize');

module.exports = (options, imports, register) => {
    const { logger } = imports;
    const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
        host: process.env.MYSQL_HOST,
        logging: logger.debug
    });
    register(null, { sequelize });
};
