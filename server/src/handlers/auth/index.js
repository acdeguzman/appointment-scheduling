const login = require('./login').handler;
const register = require('./register').handler;
const cors = require('./cors').handler;

module.exports = {
    login,
    register,
    cors
}