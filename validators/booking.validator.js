const Joi = require('joi');

const {constants} = require('../configs');

const isBookingBodyValid = Joi.object({
    check_in: Joi
        .date()
        .min(constants.MIN_DATE)
        .required(),
    check_out: Joi
        .date()
        .greater(Joi.ref('check_in'))
        .disallow(Joi.ref('check_in'))
        .required(),
});

module.exports = {
    isBookingBodyValid
};
