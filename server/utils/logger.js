const { removeBlankProperties } = require('./string')

const logServerRequest = (request, h) => {
    console.info({
        type: 'Server Request',
        request: `${request.raw.req.method} ${request.raw.req.url}`
    })
    return h.continue;
}

const logDetails = (method, type, details, stringify = true) => {
    console[method]({
        type,
        information: stringify 
        ? JSON.stringify(details) === '{}' 
            ? removeBlankProperties(details)
            : JSON.stringify(removeBlankProperties(details))
        : details
    });
}

module.exports = {
    logServerRequest,
    logDetails
}