const {bookingController} = require('../controllers');
const {bookingMiddleware, authMiddleware} = require('../middlewares');
const router = require('express')
    .Router();

router.post(
    '/:user_id/:apartment_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isBookingBodyValid,
    bookingMiddleware.isBookingDateFree,
    bookingController.createBooking);

module.exports = router;
