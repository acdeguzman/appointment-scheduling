const createAppointment = require('./create-appointment').handler;
const deleteAppointment = require('./delete-appointment').handler;
const updateAppointment = require('./update-appointment').handler;
const getAppointments = require('./get-appointments').handler;
const getAppointment = require('./get-appointment').handler;

module.exports = {
    createAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointments,
    getAppointment
}