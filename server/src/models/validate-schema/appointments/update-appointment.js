const Joi = require('joi');

module.exports = {
    headers: Joi.object({
        authorization: Joi.string().required()
    }).required(),
    options: {
        allowUnknown: true
    },
    params: Joi.object({
        id: Joi.string().required()
    }).required(),
    payload: Joi.object({
        patients: Joi.string().required(),
        date: Joi.string().pattern(/^2[0-9]{3}-[0-1][0-9]-[0-3][0-9]$/).required(),
        start: Joi.string().pattern(/^[0-1][0-9]:[0-6][0-9]$/).required(),
        end: Joi.string().pattern(/^[0-1][0-9]:[0-6][0-9]$/).required(),
        comment: Joi.string().required(),
        doctor_email: Joi.string().email().optional()
    }).required()
}