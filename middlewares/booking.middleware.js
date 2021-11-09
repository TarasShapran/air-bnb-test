const dayJs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');

dayJs.extend(isBetween);


const {Booking} = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const {constants} = require('../configs');
const {bookingValidator} = require('../validators');
const {bookingUtil} = require('../util');

module.exports = {
    isBookingDateFree: (action = 'create') => async (req, res, next) => {
        try {
            let apartment_id = null;

            if (action === 'create') {
                const {apartment_id: id} = req.params;

                apartment_id = id;
            }

            if (action === 'update') {
                const {apartment_id: id} = req.booking;

                apartment_id = id;
            }

            const {check_in, check_out} = req.body;

            const reservedApartments = await Booking.find({apartment_id, isActive: true});

            if (reservedApartments) {
                bookingUtil.isDateNotReserved(reservedApartments, check_in, check_out);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isDateFreeBookingApprove: async (req, res, next) => {
        try {
            const {booking_id: _id} = req.params;

            const {check_in, check_out, apartment_id, isActive} = await Booking.findOne({_id});

            if (isActive) {
                throw new ErrorHandler('You can not activate already active booking', constants.FORBIDDEN);
            }

            const reservedApartments = await Booking.find({apartment_id, isActive: true});

            if (reservedApartments) {
                bookingUtil.isDateNotReserved(reservedApartments, check_in, check_out);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBookingBodyValid: (req, res, next) => {
        try {
            const {error, value} = bookingValidator.isBookingBodyValid.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, constants.BAD_REQUEST);
            }

            req.body = value;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkBookingIdAndUserIdMiddleware: async (req, res, next) => {
        try {
            const {booking_id} = req.params;

            const {_id} = req.user;

            const user_id = _id.toString();

            const bookingId = await Booking.findOne({_id: booking_id, user_id});

            if (!bookingId) {
                throw new ErrorHandler(constants.BOOKING_ID_DOES_NOT_EXIST, constants.BAD_REQUEST);
            }

            req.booking = bookingId;

            next();
        } catch (err) {
            next(err);
        }
    },

    isUserHaveAccessAddReview: async (req, res, next) => {
        try {
            const {apartment_id} = req.params;

            const {_id} = req.user;

            const user_id = _id.toString();

            const usersBooking = await Booking.findOne({
                user_id,
                apartment_id,
                booking_end: {$lt: Date.now()}
            });

            if (!usersBooking) {
                throw new ErrorHandler(constants.ACCESS_DENIED, constants.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkBookingIdMiddleware: async (req, res, next) => {
        try {
            const {booking_id} = req.params;

            const bookingId = await Booking.findOne({_id: booking_id});

            if (!bookingId) {
                throw new ErrorHandler(constants.BOOKING_ID_DOES_NOT_EXIST, constants.BAD_REQUEST);
            }

            req.booking = bookingId;

            next();
        } catch (err) {
            next(err);
        }
    },
};
