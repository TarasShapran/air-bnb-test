const {userValidator} = require('../validators');
const ErrorHandler = require('../errors/ErrorHandler');
const {constants} = require('../configs');


module.exports = {
    isApartmentBodyValid:(req, res, next)=>{
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, constants.BAD_REQUEST);
            }

            req.body = value;
            next();
        } catch (err) {
            next(err);
        }
    }
};
