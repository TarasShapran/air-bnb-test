const Joi = require('joi');

const {apartmentTypeEnum} = require('../configs');

const createApartmentValidator = Joi.object({
    country: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .required()
        .trim(),
    city: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .required()
        .trim(),
    description: Joi
        .string()
        .min(20)
        .max(1500)
        .required()
        .trim(),
    region: Joi
        .string()
        .min(2)
        .max(30)
        .required()
        .trim(),
    type: Joi
        .string()
        .allow(...Object.values(apartmentTypeEnum)),
    number_of_rooms: Joi
        .number()
        .required(),
    number_of_beds: Joi
        .number()
        .required(),
    amount_of_places: Joi
        .number()
        .required(),
    price: Joi
        .number()
        .required(),
    approve: Joi
        .boolean()

});

const isStarPresentValidator = Joi.object({
    star: Joi
        .number()
        .min(1)
        .max(5)
        .required()
});

module.exports = {
    createApartmentValidator,
    isStarPresentValidator
};
