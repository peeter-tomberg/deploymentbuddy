const Joi = require('joi');
const Boom = require('boom');

const response = {
    schema: {
        accessToken: Joi.string().required().description('A JWT token used to authorize the user in the following requests')
    }
};

const createHapiSignupRoute = () => {
    return {
        method: 'POST',
        path: `/auth/signup`,
        config: {
            tags: ['api', 'satellizer'],
            description: `Signup via email`,
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                }
            },
            response,
            handler: async (request, reply) => {
                try {
                    const existingUser = await findUserByEmail(request.payload.email);
                    if (!existingUser) {

                    }
                    reply(createAccessToken(existingUser));
                }
                catch (error) {
                    request.logger.error(error);
                    reply(Boom.badRequest());
                }
            }
        }
    }
};

const createHapiServiceRoutes = (services, findUserByAuthentication, findUserByEmail, createUser, addAuthenticationToUser, createAccessToken) => {
    return services.map((service) => {
        return {
            method: 'POST',
            path: `/auth/login/${service.SERVICE_NAME}`,
            config: {
                tags: ['api', 'satellizer'],
                description: `Login via ${service.SERVICE_NAME}`,
                notes: [
                    'Will link accounts with the same email together',
                    'Will create a new user if no matching user found'
                ],
                validate: {
                    payload: service.validation
                },
                response,
                handler: async (request, reply) => {
                    try {
                        const { user, authentication } = await service.handler(request.payload);
                        let existingUser = await findUserByAuthentication(authentication);
                        if (!existingUser) {
                            existingUser = await findUserByEmail(user.email);
                            if (existingUser) {
                                await addAuthenticationToUser(existingUser, authentication);
                            }
                            else {
                                existingUser = await createUser(user, authentication);
                            }
                        }
                        reply(createAccessToken(existingUser));
                    }
                    catch (error) {
                        request.logger.error(error);
                        reply(Boom.badRequest());
                    }
                }
            }
        }
    });
};

module.exports = {
    createHapiServiceRoutes
};
