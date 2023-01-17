const Joi = require('joi');

module.exports = {
    options: {
        allowUnknown: true
    },
    payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string().min(0).required(),
        type: Joi.string().valid('doctor', 'scheduler').required()
    }).required()
}