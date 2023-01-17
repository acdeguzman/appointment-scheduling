const updateDoctorById = require('./update-doctor').handler;
const getUsers = require('./get-users').handler;
const getUser = require('./get-user').handler;

module.exports = {
    updateDoctorById,
    getUsers,
    getUser
}