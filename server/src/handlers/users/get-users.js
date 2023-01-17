module.exports.handler = async (req) => {

    try {

        const {
            status,
            type
        } = req.query

        const {
            redis_client,
            parseRedisData,
            services
        } = req;

        // retrieve all user keys
        const keys = await services.operations.keys(
            '*.session', 
            redis_client
        );
        
        // retrieve all user data
        let entries = await Promise.all(keys.map(async (key) => {
            const data = await services.operations.hGetAll(
                key, 
                redis_client,
                parseRedisData
            );
            return data;
        }))

        if(status) {
            let isActive = status === 'active' ? 'true' : 'false';
            entries = entries.filter(entry => entry.isActive === isActive);
        }

        if(type) {
            entries = entries.filter(entry => entry.type === type);
        }

        return {
            statusCode: 200,
            result: entries
        }
    }

    catch(err) {
        throw err;
    }
}