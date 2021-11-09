const {bookingController} = require('../controllers');
const {bookingMiddleware, authMiddleware, apartmentMiddleware, userMiddleware} = require('../middlewares');
const router = require('express')
    .Router();

router.post(
    '/:user_id/:apartment_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isBookingBodyValid,
    userMiddleware.checkUserIdMiddleware,
    apartmentMiddleware.checkApartmentIdMiddleware,
    bookingMiddleware.isBookingDateFree(),
    bookingController.createBooking);

router.put(
    '/:booking_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isDateFreeBookingApprove,
    bookingController.approveBooking);

router.put(
    '/:user_id/:booking_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isBookingBodyValid,
    bookingMiddleware.checkBookingIdAndUserIdMiddleware,
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
    '/:user_id/:booking_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.checkBookingIdAndUserIdMiddleware,
    bookingController.deleteBooking);

module.exports = router;
