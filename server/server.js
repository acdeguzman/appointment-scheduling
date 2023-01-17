const Glue = require('@hapi/glue');
const { logServerRequest, logDetails } = require('./utils/logger');
const response = require('./utils/response');

require('dotenv').config()

const manifest = {
    server: { 
        port: process.env.SERVER_PORT,
        routes: {
            cors: true
        }
    },
    register: {
        plugins: [
            './auth-plugin',
            './appointment-plugin',
            './user-plugin'
        ]
    }
}

const options = {
    relativeTo: `${__dirname}/src/plugins`
}

const startServer = async () => {
    try {
        const server = await Glue.compose(manifest, options);
        server.start();
        console.log(`Server running at port ${process.env.SERVER_PORT}`);

        server.ext('onRequest', logServerRequest);
        // handle response before returning
        server.ext('onPreResponse', response.pre);
    } catch (err) {
        logDetails('error', 'ERROR', err);
        process.exit(1);
    }
}

startServer();

module.exports = async () => {
    const server = await Glue.compose(manifest, options);
    return server;
}