const getCredentials = (token, decode) =>{

    // retrieve base64 encoded string from authorization header
    const credentials = token.split(' ')[1];
    const decoded_credentials = decode(credentials).split(':');

    return decoded_credentials;
}

const isSamePassword = async (bcrypt, input, retrieved) => {

   return await bcrypt.compare(input[1], retrieved);
}

module.exports.handler = async (req) => {
    try {
        const {
            authorization
        } = req.headers;

        const { 
            decode,
            bcrypt,
            redis_client,
            lodash,
            parseRedisData,
            jwt,
            generateToken,
            services
        } = req;

        // get credentials from basic token
        const credentials = getCredentials(authorization, decode);

        // get user details
        const user_details = await services.operations.hGetAll(
            `${credentials[0]}.session`, 
            redis_client, 
            parseRedisData
        );

        // if username does not exist in db, return error
        if(lodash.isEmpty(user_details)) {
            throw {
                type: 'UnregisteredCredentials'
            }
        }

        // check if password entered is same as the one saved in db
        if(!isSamePassword(bcrypt, credentials[1], user_details.password)) {
            throw {
                type: 'UnregisteredCredentials'
            }
        }

        // generate authorization token
        // token expires in an hr
        const token = await generateToken(jwt, user_details);

        return {
            statusCode: 200,
            result: {
                token,
                expires_in: Math.floor(Date.now() / 1000) + (60 * 60),
                type: user_details.type
            }
        }

    } catch (err) {
        throw err;
    }
}