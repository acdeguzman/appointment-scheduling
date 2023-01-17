const Joi = require('joi');

module.exports = {
    options: {
        allowUnknown: true
    },
    headers: Joi.object({
        authorization: Joi.string().required()
    }).required(),
    query: Joi.object({
        status: Joi.string().valid('active', 'inactive'),
        type: Joi.string().valid('doctor', 'scheduler')
    }).optional()
}