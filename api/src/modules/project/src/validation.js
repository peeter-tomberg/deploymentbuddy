const Joi = require('joi');

const documentSchema = Joi.object().keys({
    command: Joi.string().required()
});

const projectSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().optional().email(),
    cwd: Joi.string().required(),
    commands: Joi.array().required().items(documentSchema)
});

module.exports = { projectSchema };
