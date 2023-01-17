const Joi = require('joi');

module.exports = {
    options: {
        allowUnknown: true
    },
    headers: Joi.object({
        authorization: Joi.string().required()
    }).required()
}