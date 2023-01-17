module.exports.handler = async (req) => {
    try {
        const {
            email,
            password,
            name,
            type
        } = req.payload;

        const {
            redis_client,
            lodash,
            bcrypt,
            parseRedisData,
            services
        } = req;

        // get data from redis based on email input
        const user_details = await services.operations.hGetAll(
            `${email}.session`,
            redis_client,
            parseRedisData
        );

        // check if email already exists, 
        // proceed to registration if not exists; 
        // return error if exists
        if(!lodash.isEmpty(user_details)) {
            throw {
                type: 'EmailAlreadyUsed'
            }
        }

        // encrypt password before inserting to db
        const salt_rounds = 10;
        const encrypted_password = await bcrypt.hash(password, salt_rounds);

        // insert to db
        await services.operations.hSet(
            `${email}.session`, 
            {
                password: encrypted_password, 
                name, 
                email, 
                type,
                isActive: type === 'doctor' ? 'true' : 'false'
            },
            redis_client
        )

        return {
            statusCode: 201
        }

    } catch (err) {
        throw err;
    }
}