const {bookingController} = require('../controllers');
const {bookingMiddleware, authMiddleware, apartmentMiddleware} = require('../middlewares');
const router = require('express')
    .Router();

router.post(
    '/:apartment_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isBookingBodyValid,
    apartmentMiddleware.checkApartmentIdMiddleware,
    bookingMiddleware.isBookingDateFree(),
    bookingController.createBooking);

router.put(
    '/:booking_id/approve',
    authMiddleware.checkAccessToken,
    bookingMiddleware.checkBookingIdMiddleware,
    bookingMiddleware.isDateFreeBookingApprove,
    bookingController.approveBooking);
router.put(
    '/:booking_id/refuse',
    authMiddleware.checkAccessToken,
    bookingMiddleware.checkBookingIdMiddleware,
    bookingController.refuseBooking);

router.put(
    '/:booking_id',
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
    '/:booking_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.checkBookingIdAndUserIdMiddleware,
    bookingController.deleteBooking);

module.exports = router;
