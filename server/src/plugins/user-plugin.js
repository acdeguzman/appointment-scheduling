const UsersSchemaService = require('../models/validate-schema/users');
const UsersService = require('../handlers/users');
const { validate } = require('../../utils/validate');
const { authenticate } = require('../../utils/authenticate');


module.exports = {
    name: 'user-plugin',
    register: async (server) => {
        server.route({
            method: 'PATCH',
            path: '/api/v1/users/{id}',
            options: {
                id: 'UpdateDoctorById',
                validate: validate(UsersSchemaService.UpdateDoctorSchema),
                pre: [
                    { method: authenticate, assign: 'user' }
                ],
                handler: UsersService.updateDoctorById
            }
        });

        server.route({
            method: 'GET',
            path: '/api/v1/users',
            options: {
                id: 'GetUsers',
                validate: validate(UsersSchemaService.GetUsersSchema),
                pre: [
                    { method: authenticate, assign: 'user' }
                ],
                handler: UsersService.getUsers
            }
        });

        server.route({
            method: 'GET',
            path: '/api/v1/users/{id}',
            options: {
                id: 'GetUser',
                validate: validate(UsersSchemaService.GetUserSchema),
                pre: [
                    { method: authenticate, assign: 'user' }
                ],
                handler: UsersService.getUser
            }
        });
    }
}