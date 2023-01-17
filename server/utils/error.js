const _ = require('lodash');
const Boom = require('@hapi/boom');
const { logDetails } = require('./logger');
const { errorList } = require('./error-list');
const constants = require('./constants');

const getError = (type, error) => {
    const errorResponse = errorList;
    if (errorResponse[type]) {
        if (error) {
            if (error.details) {
                errorResponse[type].details = error.details;
            }
            if (error.displayMessage) {
                errorResponse[type].displayMessage = error.displayMessage;
            } else {
                errorResponse[type].displayMessage = ''
            }
        }
        return errorResponse[type]
    }
    return errorResponse.Default;
}

const formatError = response => {
    let logData = '';
    if (JSON.stringify(response.data) === '{}') {
        logData = JSON.stringify(response);
    } else if (typeof response.data !== 'undefined' && response.data !== null) {
        logData = response.data
    } else {
        logData = response;
    }
    logDetails('error', 'RESPONSE_ERROR', logData);
    if (typeof response.output.payload !== 'undefined') {
        // Invalid Request Payload Handling
        if (response.output.payload.message.includes(constants.ERROR_INVALID_REQUEST_PAYLOAD)) {
            response.data.type = 'InvalidPayload';
        }
    }
    const customError = getError(_.get(response, 'data.type', 'Default'), {
        details: _.get(response, 'data.details', false),
        displayMessage: _.get(response, 'data.displayMessage', false)
    });
    // Creates a Boom instance based on the error type
    const error = Boom[customError.type](customError.message);
    error.reformat();
    error.output.payload = {
        error: {
            code: customError.code,
            message: customError.message,
            details: customError.details,
            displayMessage: customError.displayMessage
        }
    }
    return error;
}

module.exports = {
    getError,
    formatError
}