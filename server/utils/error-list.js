// Mapping of Boom methods
const boomErrors = {
    BAD_REQUEST: 'badRequest',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    NOT_FOUND: 'notFound',
    TOO_MANY_REQUESTS: 'tooManyRequests',
    INTERNAL_SERVER_ERROR: 'badImplementation',
    SERVICE_UNAVAILABLE: 'serverUnavailable',
    GATEWAY_TIMEOUT: 'gatewayTimeout'
}

const errorList = {
    // 400
    InvalidParameters: {
        type: boomErrors.BAD_REQUEST,
        code: '40001',
        message: 'Invalid Parameter',
        details: 'The request parameter is invalid',
        displayMessage: ''
    },
    InsufficientParameters: {
        type: boomErrors.BAD_REQUEST,
        code: '40002',
        message: 'Invalid Parameter',
        details: 'The request parameter is missing a required parameter',
        displayMessage: ''
    },
    InvalidPayload: {
        type: boomErrors.BAD_REQUEST,
        code: '40003',
        message: 'Invalid Payload',
        details: 'The request body is invalid',
        displayMessage: ''
    },
    InvalidDoctorData: {
        type: boomErrors.BAD_REQUEST,
        code: '40004',
        message: 'Invalid Doctor data',
        details: 'Invalid doctor details',
        displayMessage: ''
    },
    DailyAppointmentLimitExceeded: {
        type: boomErrors.BAD_REQUEST,
        code: '40005',
        message: 'Appointment Limit Exceeded',
        details: 'Cannot add more appointments for today',
        displayMessage: ''
    },
    InvalidAppointmentDate: {
        type: boomErrors.BAD_REQUEST,
        code: '40006',
        message: 'Invalid Appointment Date',
        details: 'Appointment can only be scheduled from today onwards (excluding weekends).',
        displayMessage: ''
    },
    InactiveDoctorAssignment: {
        type: boomErrors.BAD_REQUEST,
        code: '40007',
        message: 'Inactive Doctor',
        details: 'Cannot assign appointment to an inactive doctor',
        displayMessage: ''
    },
    InvalidAppointmentTime: {
        type: boomErrors.BAD_REQUEST,
        code: '40008',
        message: 'Invalid Appointment Time',
        details: 'Appointment can only be scheduled from 9am to 5pm. End time should be after start time',
        displayMessage: ''
    },
    InvalidDateFilter: {
        type: boomErrors.BAD_REQUEST,
        code: '40009',
        message: 'Invalid Date Range',
        details: 'Date range filter is invalid',
        displayMessage: ''
    },
    AcceptCountExceeded: {
        type: boomErrors.BAD_REQUEST,
        code: '40010',
        message: 'Appointment Acceptance Limit Exceeded',
        details: 'Cannot accept anymore appointments for this doctor',
        displayMessage: ''
    },
    // 401
    UnregisteredCredentials: {
        statusCode: '401',
        type: boomErrors.UNAUTHORIZED,
        code: '40101',
        message: 'Unregistered Credentials',
        details: 'The credentials used does not exist in the database'
    },
    InvalidAccessToken: {
        statusCode: '401',
        type: boomErrors.UNAUTHORIZED,
        code: '40102',
        message: 'Invalid Access Token',
        details: 'The authorization header is not valid '
    },
    InvalidCredentials: {
        statusCode: '401',
        type: boomErrors.UNAUTHORIZED,
        code: '40103',
        message: 'Invalid Credentials',
        details: 'The credentials used is not valid'
    },
    InvalidScheduler: {
        statusCode: '401',
        type: boomErrors.UNAUTHORIZED,
        code: '40104',
        message: 'Invalid Scheduler',
        details: 'Only schedulers can create/delete appointments'
    },
    UnregisteredScheduler: {
        statusCode: '401',
        type: boomErrors.UNAUTHORIZED,
        code: '40105',
        message: 'Unregistered Scheduler',
        details: 'The scheduler credentials used does not exist in the database'
    },
    ExpiredAccessToken: {
        statusCode: '401',
        type: boomErrors.UNAUTHORIZED,
        code: '40106',
        message: 'Expired Access Token',
        details: 'The authorization header is expired'
    },
    DifferentDoctor: {
        statusCode: '401',
        type: boomErrors.UNAUTHORIZED,
        code: '40107',
        message: 'Different doctor',
        details: 'The logged in doctor is not allowed to modify the current resource'
    },
    InactiveDoctor: {
        statusCode: '401',
        type: boomErrors.UNAUTHORIZED,
        code: '40108',
        message: 'Inactive Doctor',
        details: 'Only active doctors can update appointments'
    },
    AppointmentAlreadyAccepted: {
        statusCode: '401',
        type: boomErrors.UNAUTHORIZED,
        code: '40109',
        message: 'Appointment already accepted',
        details: 'Cannot modify/delete appointments already accepted by a doctor'
    },
    // 404
    ResourceNotFound: {
        type: boomErrors.NOT_FOUND,
        code: '40401',
        message: 'Resource Not Found',
        details: 'The requested resource is not found',
        displayMessage: ''
    },
    EmailAlreadyUsed: {
        type: boomErrors.BAD_REQUEST,
        code: '40005',
        message: 'Invalid email',
        details: 'Email is already used'
    },
    // 500
    Default: {
        statusCode: '500',
        type: boomErrors.INTERNAL_SERVER_ERROR,
        code: '50001',
        message: 'Downstream Error',
        details: 'The server encountered an internal downstream error.',
        displayMessage: ''
    }
}

module.exports = {
    errorList
}