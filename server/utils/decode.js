const { decode } = require('base-64');


const decode_credentials = credentials => {

    try {

        const decoded_credentials = decode(credentials);
        return decoded_credentials
    }

    catch(err) {
        throw {
            type: 'InvalidCredentials'
        }
    }
}

module.exports = {
    decode_credentials
}