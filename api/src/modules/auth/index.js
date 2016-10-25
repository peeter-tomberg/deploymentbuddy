const Joi = require('joi');

module.exports = (options, imports, register) => {
    const { httpPrivate, jwt } = imports;
    const { User } = imports.models;

    httpPrivate.route({
        method: 'POST',
        path: '/auth/signup',
        config: {
            tags: ['api'],
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                }
            }
        },
        handler: (request, reply) => {

            reply(User.create(request.payload))
        }
    });
    httpPrivate.route({
        method: 'POST',
        path: '/auth/token',
        config: {
            tags: ['api']
        },
        handler: (request, reply) => {
            User.findOne({ id: 1 }).then((user) => jwt.sign({ user })).then(reply);
        }
    });
    httpPrivate.route({
        method: 'POST',
        path: '/auth/verify',
        config: {
            tags: ['api'],
            validate: {
                payload: {
                    token: Joi.string().required()
                }
            }
        },
        handler: (request, reply) => reply(jwt.decode(request.payload.token))
    });
    register();
};
