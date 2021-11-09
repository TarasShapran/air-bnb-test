const {commentController} = require('../controllers');
const {
    userMiddleware,
    apartmentMiddleware,
    authMiddleware,
    commentMiddleware,
    bookingMiddleware,
    fileMiddleware
} = require('../middlewares');
const router = require('express')
    .Router();

router.post(
    '/:user_id/:apartment_id',
    authMiddleware.checkAccessToken,
    commentMiddleware.isCommentBodyValid,
    userMiddleware.checkUserIdMiddleware,
    apartmentMiddleware.checkApartmentIdMiddleware,
    bookingMiddleware.isUserHaveAccessAddReview,
    fileMiddleware.checkCommentPhoto,
    commentController.createComment);

router.get('/',
    authMiddleware.checkAccessToken,
    commentController.getAllComments);

module.exports = router;
