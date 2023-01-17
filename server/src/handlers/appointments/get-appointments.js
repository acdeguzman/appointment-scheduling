const isDateWithinRange = (date, to, from, date_fns) => {
    return ((date_fns.isAfter(date, from) && date_fns.isBefore(date, to) || date_fns.isEqual(date, from) || date_fns.isEqual(date, to)))
}

module.exports.handler = async(req) => {
    
    try {
        const {
            redis_client,
            parseRedisData,
            date_fns,
            services
        } = req;
    
        const {
            to_date,
            from_date,
            doctor_email
        } = req.query;
        
        // retrieve all appointment keys
        const keys = await services.operations.keys(
            '*.appointment', 
            redis_client
        );
        
        // retrieve all appointments
        let entries = await Promise.all(keys.map(async (key) => {
            const data = await services.operations.hGetAll(
                key, 
                redis_client,
                parseRedisData
            );
            return data;
        }))

        // check if there are date range filter
        if(to_date && from_date) {
            // check first if to and from dates are valid
            if(date_fns.isBefore(new Date(to_date), new Date(from_date))) {
                throw {
                    type: 'InvalidDateFilter'
                }
            }
            
            const from = new Date(from_date);
            const to = new Date(to_date);

            entries = entries.filter(entry => {
                return isDateWithinRange(new Date(entry.date), to, from, date_fns)
            });
        }

        if(doctor_email) {
            entries = entries.filter(entry => entry.doctor_email === doctor_email)
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