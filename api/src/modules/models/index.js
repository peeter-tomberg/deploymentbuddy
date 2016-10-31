const Sequelize = require('sequelize');

module.exports = (options, imports, register) => {
    const { sequelize } = imports;

    const User = sequelize.define('user', {
        email: Sequelize.STRING,
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        displayName: Sequelize.STRING
    });
    const Authentication = sequelize.define('authentication', {
        serviceType: Sequelize.STRING,
        serviceToken: Sequelize.STRING,
        serviceSecret: Sequelize.STRING
    });
    const Project = sequelize.define('project', {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cwd: Sequelize.STRING
    });
    const Command = sequelize.define('command', {
        command: Sequelize.STRING
    });
    User.hasMany(Project);
    User.hasMany(Authentication);
    Project.hasMany(Command);
    Project.belongsTo(User);
    Command.belongsTo(Project);
    Authentication.belongsTo(User);

    sequelize.sync({ force: true })
        .then(() => register(null, { models: { Project, Command, User, Authentication } }))
        .catch(register);
};
