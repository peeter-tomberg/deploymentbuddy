const lodash = require('lodash');

const { createHapiServiceRoutes } = require('./src/helper');

const facebook = require('./src/services/facebook');
const google = require('./src/services/google');

module.exports = (options, imports, register) => {
    const { httpPrivate, jwt } = imports;
    const { User, Authentication } = imports.models;

    const findUserByAuthentication = (authentication) => {
        return User.findOne({
            include: [{
                model: Authentication,
                where: { serviceType: authentication.serviceType, serviceToken: authentication.serviceToken }
            }]
        });
    };
    const findUserByEmail = (email) => {
        return User.findOne({
            where: {
                email
            },
            include: [{
                model: Authentication
            }]
        });
    };
    const createUser = (user, authentication) => {
        return User.create(lodash.extend({}, user, { authentications: [authentication] }), { include: [ Authentication ] });
    };
    const addAuthenticationToUser = async (existingUser, authentication) => {
        return existingUser.addAuthentication(await Authentication.create(authentication));
    };

    const createAccessToken = user => ({ accessToken: jwt.sign({ user }) });

    httpPrivate.route(createHapiServiceRoutes([facebook, google], findUserByAuthentication, findUserByEmail, createUser, addAuthenticationToUser, createAccessToken));
    register();
};
