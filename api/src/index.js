require('dotenv-safe').load();

const path = require('path');
const architect = require("architect");

const configPath = path.join(__dirname, "config.js");
const config = architect.loadConfig(configPath);

architect.createApp(config, (err, app) => {
    if (err) throw err;
    app.services.logger.info('Application ready');
});
