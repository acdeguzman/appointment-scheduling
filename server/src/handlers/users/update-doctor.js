module.exports.handler = async (req) => {
    try {
        const {
            id
        } = req.params;
    
        const {
            user
        } = req.pre;
    
        const {
            redis_client,
            parseRedisData,
            services
        } = req;
    
        // check if doctor whose status to be updated exists
        // get scheduler data
        const doctor_data = await services.operations.hGetAll(
            `${id}.session`,
            redis_client,
            parseRedisData
        );
    
        // throw error if id to update is not a doctor
        if(doctor_data.type !== 'doctor') {
            throw {
                type: 'InvalidDoctorData'
            }
        }
    
        // check if user type is doctor and email is same to email to update
        if(user.type === 'doctor') {
            if(user.username === id) {
                const status = doctor_data.isActive === 'false' ? 'true' : 'false';
                await services.operations.hSet(
                    `${id}.session`,
                    {
                        "isActive": status
                    },
                    redis_client
                )
            }
    
            else {
                throw {
                    type: 'DifferentDoctor'
                }
            }
        }
    
        else {
            const status = doctor_data.isActive === 'false' ? 'true' : 'false';
            await services.operations.hSet(
                `${id}.session`,
                {
                    "isActive": status
                },
                redis_client
            )
        }
    
        return {
            statusCode: 204
        }
    }

    catch(err) {
        throw err;
    }
}