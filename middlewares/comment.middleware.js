const {commentValidator} = require('../validators');
const ErrorHandler = require('../errors/ErrorHandler');
const {constants} = require('../configs');
const {Comment} = require('../dataBase');

module.exports = {
    isCommentBodyValid: (req, res, next) => {
        try {
            const {error, value} = commentValidator.isCommentBodyValid.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, constants.BAD_REQUEST);
            }

            req.body = value;

            next();
        } catch (err) {
            next(err);
        }
    },

    isUserHaveAccessDeleteComment: async (req, res, next) => {
        try {
            const {comment_id} = req.params;

            const {id} = req.user;

            const user_id = id.toString();

            const comment = await Comment.findOne({
                _id: comment_id,
                user_id
            });

            if (!comment) {
                throw new ErrorHandler(constants.ACCESS_DENIED, constants.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
