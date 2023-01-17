const Joi = require('joi');

module.exports = {
    headers: Joi.object({
        authorization: Joi.string().trim().required()
    }).required(),
    options: {
        allowUnknown: true
    },
    params: Joi.object({
        id: Joi.string().required()
    }).required()
}