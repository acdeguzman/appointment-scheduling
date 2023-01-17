const AppointmentsSchemaService = require('../models/validate-schema/appointments');
const AppointmentsService = require('../handlers/appointments');
const { validate } = require('../../utils/validate');
const { generate_email } = require('../../utils/generate-email');
const date_fns = require('date-fns');
const { authenticate } = require('../../utils/authenticate');

module.exports = {
    name: 'appointment-plugin',
    register: async (server) => {
        
        server.decorate('request', 'date_fns', date_fns);
        server.decorate('request', 'generate_email', generate_email);

        server.route({
            method: 'POST',
            path: '/api/v1/appointments',
            options: {
                id: 'CreateAppointment',
                validate: validate(AppointmentsSchemaService.CreateAppointmentSchema),
                pre: [
                    { method: authenticate, assign: 'user' }
                ],
                handler: AppointmentsService.createAppointment
            }
        });

        server.route({
            method: 'DELETE',
            path: '/api/v1/appointments/{id}',
            options: {
                id: 'DeleteAppointment',
                validate: validate(AppointmentsSchemaService.DeleteAppointmentSchema),
                pre: [
                    { method: authenticate, assign: 'user' }
                ],
                handler: AppointmentsService.deleteAppointment
            }
        });

        server.route({
            method: 'PUT',
            path: '/api/v1/appointments/{id}',
            options: {
                id: 'UpdateAppointment',
                validate: validate(AppointmentsSchemaService.UpdateAppointmentSchema),
                pre: [
                    { method: authenticate, assign: 'user' }
                ],
                handler: AppointmentsService.updateAppointment
            }
        });

        server.route({
            method: 'GET',
            path: '/api/v1/appointments',
            options: {
                id: 'GetAppointments',
                validate: validate(AppointmentsSchemaService.GetAppointmentsSchema),
                pre: [
                    { method: authenticate, assign: 'user' }
                ],
                handler: AppointmentsService.getAppointments
            }
        });

        server.route({
            method: 'GET',
            path: '/api/v1/appointments/{id}',
            options: {
                id: 'GetAppointment',
                validate: validate(AppointmentsSchemaService.GetAppointmentSchema),
                pre: [
                    { method: authenticate, assign: 'user' }
                ],
                handler: AppointmentsService.getAppointment
            }
        });
    }
}