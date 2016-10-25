const Sequelize = require('sequelize');

module.exports = (options, imports, register) => {
    const { sequelize } = imports;

    const User = sequelize.define('user', {
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING
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
    Project.hasMany(Command);
    Command.belongsTo(Project);

    sequelize.sync({ force: false })
        .then(() => register(null, { models: { Project, Command, User } }))
        .catch(register);
};
