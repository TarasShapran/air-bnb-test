const router = require('express')
    .Router();

const {commentController, } = require('../controllers');
const {
    apartmentMiddleware,
    authMiddleware,
    commentMiddleware,
    bookingMiddleware,
    fileMiddleware
} = require('../middlewares');

router.post(
    '/:apartment_id',
    authMiddleware.checkAccessToken,
    commentMiddleware.isCommentBodyValid,
    apartmentMiddleware.checkApartmentIdMiddleware,
    bookingMiddleware.isUserHaveAccessAddReview,
    fileMiddleware.checkCommentPhoto,
    commentController.createComment);

router.put(
    '/:comment_id',
    authMiddleware.checkAccessToken,
    commentMiddleware.isCommentBodyValid,
    fileMiddleware.checkCommentPhoto,
    commentController.updateComment);

router.get('/',
    commentController.getAllComments);

router.delete(
    '/:comment_id',
    authMiddleware.checkAccessToken,
    commentMiddleware.isUserHaveAccessDeleteComment,
    commentController.deleteComment);

module.exports = router;
