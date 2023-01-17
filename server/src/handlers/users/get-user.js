module.exports.handler = async (req) => {
    try {
        const {
            redis_client,
            parseRedisData,
            lodash,
            services
        } = req;
    
        const {
            id
        } = req.params
    
        // check if user to be retrieved exists
        const user_data = await services.operations.hGetAll(
            `${id}.session`,
            redis_client,
            parseRedisData
        );

        if(lodash.isEmpty(user_data)) {
            throw {
                type: 'ResourceNotFound'
            }
        }
    
        return {
            statusCode: 200,
            result: user_data
        }
    }

    catch(err) {
        throw err;
    }
}