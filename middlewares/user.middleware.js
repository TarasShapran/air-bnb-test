const {User} = require('../dataBase');
const {userValidator} = require('../validators');
const ErrorHandler = require('../errors/ErrorHandler');
const {constants} = require('../configs');

module.exports = {
    isUserEmailExistMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(constants.EMAIL_ALREADY_EXISTS, constants.BAD_REQUEST);
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    updateUserMiddleware: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, constants.BAD_REQUEST);
            }

            req.body = value;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkUserIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const userId = await User.findById(user_id);

            if (!userId) {
                throw new ErrorHandler(constants.USER_ID_DOES_NOT_EXIST, constants.BAD_REQUEST);
            }

            req.user = userId;

            next();
        } catch (err) {
            next(err);
        }
    },

    isUserBodyValid: (req, res, next) => {
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
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User
                .findOne({email})
                .lean();

            if (!userByEmail) {
                throw new ErrorHandler(constants.WRONG_EMAIL_OR_PASSWORD, constants.BAD_REQUEST);
            }

            req.user = userByEmail;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.user;
            if (!roleArr.includes(role)) {
                throw new ErrorHandler(constants.ACCESS_DENIED, constants.FORBIDDEN);
            }

            next();
        } catch (err) {
            next(err);
        }
    }
};
