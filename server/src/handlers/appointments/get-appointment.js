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
    
        const {
            user
        } = req.pre
    
        // check if appointment to be retrieved exists
        const appointment_data = await services.operations.hGetAll(
            `${id}.appointment`,
            redis_client,
            parseRedisData
        );

        if(lodash.isEmpty(appointment_data)) {
            throw {
                type: 'ResourceNotFound'
            }
        }
    
        return {
            statusCode: 200,
            result: appointment_data
        }
    }

    catch(err) {
        throw err;
    }
}