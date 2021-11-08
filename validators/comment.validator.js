const Joi = require('joi');

const isCommentBodyValid = Joi.object({
    body: Joi
        .string()
        .min(10)
        .max(1000)
        .required()
});

module.exports = {
    isCommentBodyValid
};
