const { projectSchema } = require('./src/validation');

module.exports = (options, imports, register) => {
    const { httpPrivate, ProjectSaver } = imports;
    httpPrivate.route({
        method: 'POST',
        path: '/projects',
        config: {
            tags: ['api'],
            validate: {
                payload: projectSchema
            }
        },
        handler: (request, reply) => reply(ProjectSaver(request.payload))
    });
    register();
};
