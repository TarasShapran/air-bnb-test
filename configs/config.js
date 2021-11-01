module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/air-bnb',
    PORT: process.env.PORT || 5000,

    LOCALHOST_3000: 'http://localhost:3000/',
    LOCALHOST_5000: 'http://localhost:5000/',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'xxx',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'zzz',
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'qqq',

    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '11111111',
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@gmail.com',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY

};
