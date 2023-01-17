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
    
        // check if type of user deleting the appointment is a scheduler
        if(user.type !== 'scheduler') {
            throw {
                type: 'InvalidScheduler'
            }
        }
    
        // check if appointment to be deleted exists
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

        // throw error if appointment to be deleted is already accepted by a doctor
        if(appointment_data.accepted === 'true') {
            throw {
                type: 'AppointmentAlreadyAccepted'
            }
        }

        // proceed to deletion
        await services.operations.del(
            `${id}.appointment`,
            redis_client
        )
    
        return {
            statusCode: 204
        }
    }

    catch(err) {
        throw err;
    }

}