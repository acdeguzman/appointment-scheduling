const { logDetails } = require('./logger')

const validate = (schema) => ({
    ...schema,
    failAction: (request, h, error) => {
        logDetails('error', 'JOI ERROR', error);
        const keywords = ['must contain at least one', 'is required'];
        error.details[0].type = keywords.some((k) => error.details[0].message.includes(k))
            ? 'InsufficientParameters'
            : 'InvalidParameters'
        throw error.details[0]
    }
});

module.exports = {
    validate
}