const {bookingController} = require('../controllers');
const {bookingMiddleware, authMiddleware, apartmentMiddleware, userMiddleware} = require('../middlewares');
const router = require('express')
    .Router();

router.post(
    '/:user_id/:apartment_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isBookingBodyValid,
    apartmentMiddleware.checkApartmentIdMiddleware,
    userMiddleware.checkUserIdMiddleware,
    bookingMiddleware.isBookingDateFree,
    bookingController.createBooking);

router.put(
    '/:booking_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isBookingBodyValid,
    bookingMiddleware.checkBookingIdMiddleware,
    bookingMiddleware.isBookingDateFree('update'),
    bookingController.updateBooking);

router.get(
    '/all/:apartment_id',
    apartmentMiddleware.checkApartmentIdMiddleware,
    bookingController.getAllBooking);

router.get(
    '/:booking_id',
    bookingMiddleware.checkBookingIdMiddleware,
    bookingController.getBookingById);

router.delete(
    '/:booking_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.checkBookingIdMiddleware,
    bookingController.deleteBooking);

module.exports = router;
