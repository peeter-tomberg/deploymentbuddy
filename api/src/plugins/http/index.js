const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

module.exports = (options, imports, register) => {
    const server = new Hapi.Server();
    server.connection({ port: process.env.HTTP_PUBLIC_PORT, labels: 'PUBLIC' });
    server.connection({ port: process.env.HTTP_PRIVATE_PORT, labels: 'PRIVATE' });
    server.register([Inert, Vision, HapiSwagger], (err) => {
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
