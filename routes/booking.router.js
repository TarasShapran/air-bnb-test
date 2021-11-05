const {bookingController} = require('../controllers');
const {bookingMiddleware} = require('../middlewares');
const router = require('express')
    .Router();

router.post(
    '/:user_id/:apartment_id',
    bookingMiddleware.isBookingDateFree,
    bookingController.createBooking);

module.exports = router;
