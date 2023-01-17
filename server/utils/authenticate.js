const jwt = require('jsonwebtoken');

const authenticate = async (req, h) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const hash = process.env.JWT_SECRET

        const decoded = jwt.verify(token, hash);

        return decoded.data
    }

    catch(err) {
        switch (err.name) {
            case 'TokenExpiredError':
                throw {
                    type: 'ExpiredAccessToken'
                }
            default:
                throw {
                    type: 'InvalidAccessToken'
                }
        }
    }
}

module.exports = {
    authenticate
}