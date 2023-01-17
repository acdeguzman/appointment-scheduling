const isDoctor = user => user.type === 'doctor';
const isActiveDoctor = user => user.is_active === 'true';
const isDifferentDoctor = (user, appointment_doctor) => user.username !== appointment_doctor
const appointmentAlreadyAccepted = appointment => appointment.accepted === 'true';

module.exports.handler = async (req) => {

    try {
        const {
            redis_client,
            parseRedisData,
            lodash,
            date_fns,
            generate_email,
            services
        } = req;

        const {
            id
        } = req.params

        const {
            patients,
            date,
            start,
            end,
            comment,
            doctor_email
        } = req.payload;
    
        const {
            user
        } = req.pre;

        const {
            isValidDate,
            checkIfValidAppointmentDate,
            isInvalidAppointmentTime
        } = require('./helper');

        // get current date
        const current_date = new Date();
        const current_date_php = new Date(current_date.getTime() + (8*60*60*1000)).toISOString().split('T');

        // check if appointment to be updated exists
        const appointment_data = await services.operations.hGetAll(
            `${id}.appointment`,
            redis_client,
            parseRedisData
        );
        
        // throw error if data to be updated does not exist
        if(lodash.isEmpty(appointment_data)) {
            throw {
                type: 'ResourceNotFound'
            }
        }

        // only update accepted key for doctor
        if(isDoctor(user)) {
            // inactive doctors cannot update appointment
            if(!isActiveDoctor(user)) {
                throw {
                    type: 'InactiveDoctor'
                }
            }

            // check if updating doctor is same as the doctor email in the appointment
            // throw error if not the same
            console.log(user),
            console.log(appointment_data.doctor_email);
            if(isDifferentDoctor(user, appointment_data.doctor_email)) {
                throw {
                    type: 'DifferentDoctor'
                }
            }

            // check if appointment is already accepted
            if(appointment_data.accepted === 'true') {
                throw {
                    type: 'AppointmentAlreadyAccepted'
                }
            }

            // check if doctor already accepted up to limitof accepts per day
            const appointment_accepted_count = await services.operations.get(
                `${doctor_email}.accepts.${current_date_php[0]}`,
                redis_client
            );
            
            // no accepts currently
            if(!lodash.isEmpty(appointment_accepted_count)) {
                if(parseInt(appointment_accepted_count) >= process.env.DOCTOR_ACCEPT_DAILY_LIMIT){
                    throw {
                        type: 'AcceptCountExceeded'
                    }
                }
            }
            
            // update accepted status on db
            await services.operations.hSet(
                `${id}.appointment`,
                {
                    "accepted": "true"
                },
                redis_client
            )

            // update doctor accepted count
            await services.operations.incr(
                `${doctor_email}.accepts.${current_date_php[0]}`,
                redis_client
            )

            return {
                statusCode: 201,
                result: {
                    message: 'Appointment successfully updated!'
                }
            }
        }

        // throw error if appointment to be updated is already accepted by a doctor
        if(appointmentAlreadyAccepted(appointment_data)) {
            throw {
                type: 'AppointmentAlreadyAccepted'
            }
        }

        // check first if appointment date is a valid date
        if(isValidDate(date)) {
            throw {
                type: 'InvalidParameters'
            }
        }
        
        // date is modified
        if(date !== appointment_data.date) {
            // get datetime of appointment date
            const appointment_date = new Date(date);

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
        }
        

        // start time or endtime is modified
        if(start !== appointment_data.start || end !== appointment_data.end) {
            // check start time and end time if valid
            const start_time = start.split(':');
            const end_time = end.split(':');
            if(isInvalidAppointmentTime(start_time, end_time)) {
                throw {
                    type: 'InvalidAppointmentTime'
                }
            }
        }
        
        // get scheduler data
        const scheduler_data = await services.operations.hGetAll(
            `${user.username}.session`,
            redis_client,
            parseRedisData
        )
    
        // return error if scheduler does not exist in db
        if(lodash.isEmpty(scheduler_data)) {
            throw {
                type: 'UnregisteredScheduler'
            }
        }
    
        // if doctor email is supplied
        if(doctor_email) {
            // get doctor data
            const doctor_data = await services.operations.hGetAll(
                `${doctor_email}.session`,
                redis_client,
                parseRedisData
            )
        
            // return error if doctor does not exist in db
            if(lodash.isEmpty(doctor_data) || !isDoctor(doctor_data)) {
                throw {
                    type: 'InvalidDoctorData'
                }
            }
        
            if(doctor_data.isActive === 'false') {
                throw {
                    type: 'InactiveDoctor'
                }
            }
        }
        
        const to_update = {
            patients,
            date,
            start,
            end,
            comment,
            created_by: user.username,
            doctor_email: doctor_email ? doctor_email : 'pending' 
        }

        await services.operations.hSet(
            `${id}.appointment`,
            to_update,
            redis_client
        )
        
        // send email to doctor
        // if(doctor_email) await generate_email(process.env.EMAIL_CREDENTIALS, req.payload, user);

        return {
            statusCode: 200,
            result: {
                message: 'Appointment successfully updated!'
            }
        }
    }

    catch(err) {
        throw err;
    }
}