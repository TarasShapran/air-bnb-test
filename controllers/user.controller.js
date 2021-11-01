const {User, O_Auth, ActionToken} = require('../dataBase');
const {emailService, jwtService, userService, s3Service} = require('../service');
const userUtil = require('../util/user.util');
const {emailActionsEnum, actionTokenTypeEnum, config, constants} = require('../configs');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            //const users = await User.find().lean();
            const users = await userService.getAllUsers(req.query)
                .lean();

            const normalizedUser = users.map(value => userUtil.userNormalizator(value));

            res.json(normalizedUser);
        } catch (err) {
            next(err);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = req.user;

            const normalizedUser = userUtil.userNormalizator(user.toObject());

            res.json(normalizedUser);
        } catch (err) {
            next(err);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {name} = req.body;

            const newUser = await User.createUserWithHashPassword(req.body);

            const token = jwtService.generateActionToken(actionTokenTypeEnum.ACTIVATE);

            await ActionToken.create({token, token_type: actionTokenTypeEnum.ACTIVATE, user_id: newUser._id});

            await emailService.sendMail(
                req.body.email,
                emailActionsEnum.WELCOME,
                {
                    userName: name,
                    activateUrl: `${config.LOCALHOST_5000}auth/activate/${token}`
                });

            const normalizedUser = userUtil.userNormalizator(newUser.toObject());

            res.json(normalizedUser)
                .status(constants.CREATED);
        } catch (err) {
            next(err);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            await O_Auth.deleteMany({user_id});

            await User.deleteOne({_id: user_id});

            await emailService.sendMail(req.body.email, emailActionsEnum.DELETE);

            res.sendStatus(constants.NO_CONTENT);
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const newUser = await User.findByIdAndUpdate(user_id, req.body, {new: true})
                .lean();

            await emailService.sendMail(newUser.email, emailActionsEnum.UPDATE, {userName: newUser.name});

            const normalizedUser = userUtil.userNormalizator(newUser);

            res.json(normalizedUser)
                .status(constants.CREATED);
        } catch (err) {
            next(err);
        }
    },

    addAvatar: async (req, res, next) => {
        try {
            const {avatar} = req.files;
            const {_id} = req.body;
            let user ={};

            if (avatar && req.files) {
                const uploadInfo = await s3Service.uploadImage(avatar, 'user', _id);

                user = await User.findByIdAndUpdate(_id, {avatar: uploadInfo.Location}, {new: true});
            }

            const normalizedUser = userUtil.userNormalizator(user.toObject());

            res.json(normalizedUser)
                .status(constants.CREATED);
        } catch (err) {
            next(err);
        }
    }
};
