const checkIfExceeded = (count, limit) => {
    return count >= limit
}

module.exports.handler = async (req) => {
    try {
        const {
            patients,
            date,
            start,
            end,
            comment,
            doctor_email
        } = req.payload;
    
        const {
            redis_client,
            parseRedisData,
            lodash,
            date_fns,
            generate_email,
            services
        } = req;
    
        const {
            user
        } = req.pre;
        
        const {
            isValidDate,
            checkIfValidAppointmentDate,
            isInvalidAppointmentTime
        } = require('./helper');
    
        // check if scheduled appointments for the day exceed daily limit
        const current_date = new Date();
        const current_date_php = new Date(current_date.getTime() + (8*60*60*1000)).toISOString().split('T');
        const appointment_count_key = `${current_date_php[0]}.count`;
        const appointment_count = await services.operations.get(
            appointment_count_key, 
            redis_client
        );
    
        
        const is_exceeded = checkIfExceeded(
            parseInt(appointment_count),
            process.env.APPOINTMENT_DAILY_LIMIT
        )
        
        // return error if daily appointment limit exceeded
        if(is_exceeded) {
            throw {
                type: 'DailyAppointmentLimitExceeded'
            }
        }
    
        // check first if appointment date is a valid date
        if(isValidDate(date)) {
            throw {
                type: 'InvalidParameters'
            }
        }
    
        // get datetime of appointment date
        const appointment_date = new Date(date);

        // check if appointment date is scheduled before current date or weekends
        const is_invalid_appointment_date = checkIfValidAppointmentDate(
            current_date_php[0],
            appointment_date,
            date_fns
        );

        if(is_invalid_appointment_date) {
            throw {
                type: 'InvalidAppointmentDate'
            }
        }
    
        // check start time and end time if valid
        const start_time = start.split(':');
        const end_time = end.split(':');

        if(isInvalidAppointmentTime(start_time, end_time)) {
            throw {
                type: 'InvalidAppointmentTime'
            }
        }
    
        // get scheduler data
        const scheduler_data = await services.operations.hGetAll(
            `${user.username}.session`,
            redis_client,
            parseRedisData
        );
    
        // return error if scheduler does not exist in db
        if(lodash.isEmpty(scheduler_data)) {
            throw {
                type: 'UnregisteredScheduler'
            }
        }
    
        // return error if appointment is being created by non-scheduler user
        if(scheduler_data.type !== 'scheduler') {
            throw {
                type: 'InvalidScheduler'
            }
        }
    
        // if doctor email is supplied
        if(doctor_email) {
            // get doctor data
            const doctor_data = await services.operations.hGetAll(
                `${doctor_email}.session`,
                redis_client, 
                parseRedisData
            );
        
            // return error if doctor does not exist in db
            if(lodash.isEmpty(doctor_data) || doctor_data.type !== 'doctor') {
                throw {
                    type: 'InvalidDoctorData'
                }
            }
        
            if(doctor_data.isActive === 'false') {
                throw {
                    type: 'InactiveDoctorAssignment'
                }
            }
        }
    
        // insert appointment to db
        // first, check count of current date appointment keys in db
        const appointments = await services.operations.keys(
            `*.appointment`, 
            redis_client
        );

        // add to db
        const to_create = {
                id: `${date}_${appointments.length}`,
                patients,
                date,
                start,
                end,
                comment,
                created_by: user.username,
                doctor_email: doctor_email ? doctor_email : 'pending',
                accepted: 'false'
        }

        await services.operations.hSet(
            `${date}_${appointments.length}.appointment`,
            to_create,
            redis_client
        );

        // increase appointment count
        await services.operations.incr(
            `${current_date_php[0]}.count`,
            redis_client
        )

        // send email to doctor
        // await generate_email(process.env.EMAIL_CREDENTIALS, req.payload, user);
    
        return {
            statusCode: 201,
            result: {
                message: 'Appointment successfully created!'
            }
        }
    }

    catch(err) {
        throw err;
    }
}