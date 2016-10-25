const plugins = [
    "./plugins/jwt",
    "./plugins/http",
    "./plugins/sequelize",
    "./plugins/logger"
];
const modules = [
    "./modules/models",
    "./modules/acl",
    "./modules/auth",
    "./modules/project"
];

module.exports = [
    ...plugins,
    ...modules
];
