const dayJs = require('dayjs');

const {constants, emailActionsEnum} = require('../configs');
const {Booking, Apartment, User} = require('../dataBase');
const {emailService} = require('../service');

module.exports = {
    createBooking: async (req, res, next) => {
        try {
            const {user_id, apartment_id} = req.params;

            const {check_in, check_out} = req.body;

            const {user_id: userId, price: apartmentPrice} = req.apartment;

            const {email: userEmail} = req.user;

            const booking_start = dayJs(check_in)
                .valueOf();
            const booking_end = dayJs(check_out)
                .valueOf();

            const booking_start1 = dayJs(check_in);
            const booking_end1 = dayJs(check_out);

            const numberOfDays = booking_end1.diff(booking_start1, 'day');

            const price = numberOfDays * apartmentPrice;

            const reservedApartment = await Booking.create({user_id, apartment_id, booking_start, booking_end, price});

            const {email: apartmentEmail, name: userName} = await User.findOne({_id: userId});

            await emailService.sendMail(userEmail, emailActionsEnum.RESERVED);

            await emailService.sendMail(apartmentEmail, emailActionsEnum.APARTMENT_RESERVED, {userName,check_in,check_out});

            res.json(reservedApartment)
                .status(constants.CREATED);
        } catch (e) {
            next(e);
        }
    },

    updateBooking: async (req, res, next) => {
        try {
            const {check_in, check_out} = req.body;
            const {apartment_id, _id} = req.booking;

            const booking_start = dayJs(check_in)
                .valueOf();
            const booking_end = dayJs(check_out)
                .valueOf();

            const apartment = await Apartment.findOne({apartment_id});


            const booking_start1 = dayJs(check_in);
            const booking_end1 = dayJs(check_out);

            const numberOfDays = booking_end1.diff(booking_start1, 'day');

            const price = numberOfDays * apartment.price;

            const reservedApartment = await Booking.findByIdAndUpdate({_id}, {booking_start, booking_end, price}, {new: true});

            res.json(reservedApartment)
                .status(constants.CREATED);
        } catch (e) {
            next(e);
        }
    },

    getAllBooking: async (req, res, next) => {
        try {
            const {_id: apartment_id} = req.apartment;

            const reservedApartments = await Booking.find({apartment_id});

            res.json(reservedApartments)
                .status(constants.CREATED);
        } catch (e) {
            next(e);
        }
    },

    getBookingById: (req, res, next) => {
        try {
            const booking = req.booking;

            res.json(booking)
                .status(constants.CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteBooking: async (req, res, next) => {
        try {
            const {_id} = req.booking;

            await Booking.deleteOne({_id});

            res.sendStatus(constants.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },
};
