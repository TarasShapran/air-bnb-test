const {userValidator} = require('../validators');
const ErrorHandler = require('../errors/ErrorHandler');
const {constants, tokenTypeEnum, actionTokenTypeEnum} = require('../configs');
const {jwtService, passwordService} = require('../service');
const {O_Auth, ActionToken} = require('../dataBase');

module.exports = {
    isUserAuthValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.authUserValidator.validate(req.body);

            if (error) {

                throw new ErrorHandler(error.details[0].message, constants.BAD_REQUEST);
            }

            req.body = value;

            next();
        } catch (err) {
            next(err);
        }
    },

    isUserPassValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.passwordUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, constants.BAD_REQUEST);
            }

            req.body = value;

            next();
        } catch (err) {
            next(err);
        }
    },

    isEmailValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.emailUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, constants.BAD_REQUEST);
            }

            req.body = value;

            next();
        } catch (err) {
            next(err);
        }
    },

    isPasswordMatched: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword} = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (err) {
            next(err);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth
                .findOne({access_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
            }

            req.user = tokenResponse.user_id;
            req.token = token;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const {token} = req.body;

            if (!token) {
                throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token, tokenTypeEnum.REFRESH);

            const tokenResponse = await O_Auth
                .findOne({refresh_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
            }

            req.user = tokenResponse.user_id;
            req.token = token;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkActionToken: (actionTokenTypeEnum) => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
            }

            await jwtService.verifyToken(token, actionTokenTypeEnum);

            const tokenResponse = await ActionToken
                .findOne({token});

            if (!tokenResponse) {
                throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
            }

            req.user = tokenResponse.user_id;
            req.token = token;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkActivateToken: (tokenArr = {}) => async (req, res, next) => {
        try {
            const {token} = req.params;

            console.log(tokenArr);

            switch (tokenArr) {
                case actionTokenTypeEnum.ACTIVATE:
                    await jwtService.verifyToken(token, actionTokenTypeEnum.ACTIVATE);

                    break;
                case actionTokenTypeEnum.APPROVE:
                    console.log('hello');
                    await jwtService.verifyToken(token, actionTokenTypeEnum.APPROVE);
                    break;
                default:
                    throw new ErrorHandler(constants.INVALID_TOKEN, constants.INVALID_TOKEN);
            }
            // await jwtService.verifyToken(token, actionTokenTypeEnum.ACTIVATE);
            console.log(token);
            console.log(tokenArr);
            const {user_id: user, _id} = await ActionToken.findOne({token, token_type: tokenArr});

            if (!user) {
                throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
            }


            await ActionToken.deleteOne({_id});

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }

    }

};
