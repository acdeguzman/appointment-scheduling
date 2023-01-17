const isValidDate = (date) => {
    return isNaN(Date.parse(date))
}

const checkIfValidAppointmentDate = (today, appointment_date, date_fns) => {

    const is_valid_date = date_fns.compareAsc(appointment_date, new Date(today));
    return (is_valid_date === -1 || date_fns.isSaturday(appointment_date) || date_fns.isSunday(appointment_date))
}

// invalid times:
// 1. start before 9am (9)
// 2. end after 5pm (17)
// 3. seconds > 60 on both end and start
// 4. end hr is less than start hr
// 5. end mins is less than start mins
const isInvalidAppointmentTime = (start_time, end_time) => {
    return (
            parseInt(start_time[0]) < 9 || 
            parseInt(start_time[1]) > 60 || 
            parseInt(end_time[0]) > 17 || 
            parseInt(end_time[1]) > 60 ||
            parseInt(end_time[0]) < parseInt(start_time[0]) ||
            parseInt(end_time[1] < parseInt(start_time[1]))
    )
}

module.exports = {
    isValidDate,
    checkIfValidAppointmentDate,
    isInvalidAppointmentTime
}