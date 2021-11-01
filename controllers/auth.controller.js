const {userNormalizator} = require('../util/user.util');
const {jwtService, emailService} = require('../service');
const {O_Auth, User, ActionToken} = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {user, token} = req;

            await O_Auth.deleteOne({
                access_token: token
            });

            res.json(`User with email: ${user.email} successfully logout`);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {user} = req;

            await O_Auth.deleteMany({
                user_id: user._id
            });

            res.json(`User with email: ${user.email} successfully logout`);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {user, token} = req;

            await O_Auth.deleteOne({
                refresh_token: token
            });

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: (actionTokenTypeEnum, emailActionsEnum) => async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler('User not found', constants.NOT_FOUND);
            }

            const token = jwtService.generateActionToken(actionTokenTypeEnum);

            await ActionToken.create({
                token,
                token_type: actionTokenTypeEnum,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                emailActionsEnum,
                {passwordUrl: `${config.LOCALHOST_3000}${emailActionsEnum}?token=${token}`});

            res.json('Ok');
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordForgot: async (req, res, next) => {
        try {
            const {user, body: {newPassword}} = req;

            const newUser = await User.updateUserWithHashPassword(user, newPassword);

            await O_Auth.deleteMany({
                user_id: user._id
            });

            await ActionToken.deleteMany({
                user_id: user._id
            });

            const userNormalized = userNormalizator(newUser);

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    },

    activate: async (req, res, next) => {
        try {
            const {user: {_id}} = req;

            await User.updateOne({_id}, {is_active: true});

            res.json(constants.USER_IS_ACTIVE)
                .status(constants.OK);
        } catch (e) {
            next(e);
        }
    },
};

