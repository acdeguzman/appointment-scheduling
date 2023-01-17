const nodemailer = require('nodemailer');
const { decode_credentials } = require('./decode');

const generate_email = async (email_credentials, data, scheduler) => {
    try {

        const credentials = decode_credentials(email_credentials).split(':');

        const mail_transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: credentials[0],
                pass: credentials[1]
            }
        })

        const mail_details = {
            from: credentials[0],
            to: data.doctor_email,
            subject: 'Appointment Details',
            text: `Good day!\n\nHere are the details of the appointment:\n\nPatients: ${data.patients}\nDate: ${data.date}\nFrom: ${data.start}\nTo: ${data.end}\nComment: ${data.comment}\nScheduler: ${scheduler.username}`
        }

        await mail_transporter.sendMail(mail_details);
    }

    catch(err) {
        throw err
    }
}

module.exports = {
    generate_email
}