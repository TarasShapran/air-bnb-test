const Joi = require('joi');

const {constants} = require('../configs');

const createCarValidator = Joi.object({
    brand: Joi
        .string()
        .min(2)
        .max(30)
        .required()
        .trim(),

    model: Joi
        .string()
        .min(2)
        .max(30)
        .required(),

    year: Joi
        .number()
        .max(constants.MAX_YEAR)
        .min(constants.MIN_YEAR)
        .required(),

    price: Joi
        .number()
        .required(),

});
const updateCarValidator = Joi.object({
    brand: Joi
        .string()
        .min(2)
        .max(30)
        .trim(),

    model: Joi
        .string()
        .min(2)
        .max(30),

    year: Joi
        .number()
        .max(constants.MAX_YEAR)
        .min(constants.MIN_YEAR),

    price: Joi
        .number()
        .min(0)
});

module.exports = {
    createCarValidator,
    updateCarValidator
};
