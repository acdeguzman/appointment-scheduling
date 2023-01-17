const AuthSchemaService = require('../models/validate-schema/auth');
const AuthService = require('../handlers/auth');
const { validate } = require('../../utils/validate');
const { decode_credentials } = require('../../utils/decode');
const { parseRedisData } = require('../../utils/parser');
const { generateToken } = require('../../utils/generate-token');
const services = require('../services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const Redis = require('redis');
const client = Redis.createClient();

module.exports = {
    name: 'auth-plugin',
    register: async (server) => {

        await client.connect();
        server.decorate('request', 'lodash', _);
        server.decorate('request', 'redis_client', client);
        server.decorate('request', 'parseRedisData', parseRedisData);
        server.decorate('request', 'bcrypt', bcrypt);
        server.decorate('request', 'decode', decode_credentials);
        server.decorate('request', 'jwt', jwt);
        server.decorate('request', 'generateToken', generateToken);
        server.decorate('request', 'services', services);

        server.route({
            method: 'POST',
            path: '/api/v1/auth/login',
            options: {
                id: 'Login',
                validate: validate(AuthSchemaService.LoginSchema),
                handler: AuthService.login
            }
        });

        server.route({
            method: 'POST',
            path: '/api/v1/auth/register',
            options: {
                id: 'Register',
                validate: AuthSchemaService.RegisterSchema,
                handler: AuthService.register
            }
        });

        server.route({
            method: 'OPTIONS',
            path: '/{any*}',
            options: {
                id: 'CORSValidation',
                handler: AuthService.cors
            }
        })
    }
}