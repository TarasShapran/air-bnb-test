module.exports = {
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    MIN_DATE: +(new Date()),

    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,

    ACCESS_DENIED: 'Access denied',
    AUTHORIZATION: 'Authorization',
    CAN_NOT_CHANGE_FIELDS: 'You can not change email , password or role',
    APARTMENT_ID_DOES_NOT_EXIST: 'Apartment_id does not exist',
    EMAIL_ALREADY_EXISTS: 'Email already exist',
    INVALID_TOKEN: 'Invalid token',
    USER_ID_DOES_NOT_EXIST: 'User_id does not exist',
    WRONG_EMAIL_OR_PASSWORD: 'Wrong email or password',
    WRONG_TOKEN_TYPE: 'Wrong token type',
    USER_IS_ACTIVE: 'User is Active',

    PHOTO_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    VIDEO_MAX_SIZE: 15 * 1024 * 1024, // 15MB
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],

    DOCS_MIMETYPES: [
        'application/msword', // DOC
        'application/pdf', // PDF
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
    ],

    VIDEOS_MIMETYPES: [
        'video/mpeg',
        'video/mp4',
    ]

};
