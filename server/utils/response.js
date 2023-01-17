const { formatError, getError } = require('./error');

const pre = (request, h) => {
    const { response } = request;

    if(response.isBoom) {
        console.log(response);
        const error = formatError(response);
        throw error
    }
    const { statusCode } = request.response.source;
    delete request.response.source.statusCode;
    delete request.response.source.headers;
    h.response(response).code(statusCode);

    // cors headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,PATCH,DELETE',
        'Access-Control-Allow-Credentials': false,
        'Access-Control-Allow-Headers': 'Accept, Authorization, Content-Type, If-None-Match, X-Requested-With'
    }
    
    for(const property in headers) {
        h.response(response).header(property, headers[property])
    }

    return h.response(response).takeover();
}

module.exports = {
    pre
}