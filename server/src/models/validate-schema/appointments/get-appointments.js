const Joi = require('joi');

module.exports = {
    options: {
        allowUnknown: true
    },
    headers: Joi.object({
        authorization: Joi.string().required()
    }).required(),
    query: Joi.object({
        to_date: Joi.string().pattern(/^2[0-9]{3}-[0-1][0-9]-[0-3][0-9]$/),
        from_date: Joi.string().pattern(/^2[0-9]{3}-[0-1][0-9]-[0-3][0-9]$/),
        doctor_email: Joi.string().email()
    }).and('to_date', 'from_date').optional()
}