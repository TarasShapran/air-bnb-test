const {commentController} = require('../controllers');
const {
    apartmentMiddleware,
    authMiddleware,
    commentMiddleware,
    bookingMiddleware,
    fileMiddleware
} = require('../middlewares');
const router = require('express')
    .Router();

router.post(
    '/:apartment_id',
    authMiddleware.checkAccessToken,
    commentMiddleware.isCommentBodyValid,
    apartmentMiddleware.checkApartmentIdMiddleware,
    bookingMiddleware.isUserHaveAccessAddReview,
    fileMiddleware.checkCommentPhoto,
    commentController.createComment);

router.get('/',
    commentController.getAllComments);

module.exports = router;
