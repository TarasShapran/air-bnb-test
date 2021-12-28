const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const {config, tokenTypeEnum, constants, actionTokenTypeEnum} = require('../configs');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secretWord;
            switch (tokenType) {
                case actionTokenTypeEnum.FORGOT_PASSWORD:
                    secretWord = config.JWT_ACTION_SECRET;
                    break;
                case tokenTypeEnum.ACCESS:
                    secretWord = config.JWT_ACCESS_SECRET;
                    break;
                case tokenTypeEnum.REFRESH:
                    secretWord = config.JWT_REFRESH_SECRET;
                    break;
                case actionTokenTypeEnum.CHANGE_PASSWORD:
                    secretWord = config.JWT_ACTION_SECRET;
                    break;
                case actionTokenTypeEnum.ACTIVATE:
                    secretWord = config.JWT_ACTION_SECRET;
                    break;
                case actionTokenTypeEnum.APPROVE:
                    secretWord = config.JWT_ACTION_SECRET;
                    break;
                default:
                    throw new ErrorHandler(constants.WRONG_TOKEN_TYPE, constants.INTERNAL_SERVER_ERROR);
            }
            jwt.verify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(constants.INVALID_TOKEN, constants.UNAUTHORIZED);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secretWord;
        switch (actionTokenType) {
            case actionTokenTypeEnum.FORGOT_PASSWORD:
                secretWord = config.JWT_ACTION_SECRET;
                break;
            case actionTokenTypeEnum.CHANGE_PASSWORD:
                secretWord = config.JWT_ACTION_SECRET;
                break;
            case actionTokenTypeEnum.ACTIVATE:
                secretWord = config.JWT_ACTION_SECRET;
                break;
            case actionTokenTypeEnum.APPROVE:
                secretWord = config.JWT_ACTION_SECRET;
                break;
            default:
                throw new ErrorHandler(constants.WRONG_TOKEN_TYPE, constants.INTERNAL_SERVER_ERROR);
        }

        return jwt.sign({}, secretWord, {expiresIn: '24h'});

    },
};
