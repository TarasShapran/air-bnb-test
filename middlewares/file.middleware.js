const {constants} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const {avatar} = req.files;

            if (!avatar) {

                throw new ErrorHandler('File not found', constants.NOT_FOUND);
            }

            const {name, size, mimetype} = avatar;

            if (!constants.PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler('Not supported format', constants.BAD_REQUEST);
            }

            if (size > constants.PHOTO_MAX_SIZE) {
                throw new ErrorHandler(`File ${name} is too big`, constants.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkCommentPhoto: (req, res, next) => {
        try {
            if (!req.files || !req.files.photo) {
                next();
                return;
            }

            const {name, size, mimetype} = req.files.photo;

            if (!constants.PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler('Not supported format', constants.BAD_REQUEST);
            }

            if (size > constants.PHOTO_MAX_SIZE) {
                throw new ErrorHandler(`File ${name} is too big`, constants.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
