const Joi = require('joi');

const {constants, userRoles} = require('../configs');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .required()
        .trim(),
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .required(),
    role: Joi
        .string()
        .allow(...Object.values(userRoles)),
    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .required()
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .required()
        .trim()
});

const authUserValidator = Joi.object({
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .required(),

    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .required()
});

const passwordUserValidator = Joi.object({
    newPassword: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .required()
});

const emailUserValidator = Joi.object({
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .required()
});

module.exports = {
    createUserValidator,
    authUserValidator,
    updateUserValidator,
    passwordUserValidator,
    emailUserValidator
};
