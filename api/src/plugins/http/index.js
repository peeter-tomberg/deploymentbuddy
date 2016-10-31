const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Good = require('good');
const Boom = require('boom');
const Tv = require('tv');

const HapiSwagger = require('hapi-swagger');

module.exports = (options, imports, register) => {
    const { logger } = imports;
    const server = new Hapi.Server();


    server.decorate('request', 'logger', logger);
    server.decorate('reply', 'badData', function (errors) {
        const formError = Boom.badData();
        formError.output.payload.data = errors;
        return this.response(formError);
    });


    server.connection({ port: process.env.HTTP_PUBLIC_PORT, labels: 'PUBLIC' });
    server.connection({
        port: process.env.HTTP_PRIVATE_PORT,
        labels: 'PRIVATE',
        routes: {
            validate: {
                failAction: function (request, reply, source, error) {
                    const formError = Boom.badData();
                    formError.output.payload.data = error.data.details.map(({ message, path }) => ({ message, path }));
                    reply(formError);
                },
                options: {
                    abortEarly: false
                }
            },
            cors: true
        }
    });
    server.register([Inert, Vision, HapiSwagger, Tv], (err) => {
        if (err) {
            register(err);
        }
        else {
            server.start()
                .then(() => register(null, { httpPrivate: server.select('PRIVATE'), httpPublic: server.select('PUBLIC')  }))
                .catch(register);
        }
    });
};
