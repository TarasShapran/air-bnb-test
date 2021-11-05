const dayJs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');

dayJs.extend(isBetween);


const {Booking} = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const {constants} = require('../configs');

module.exports = {
    isBookingDateFree: async (req, res, next) => {
        try {
            const {apartment_id} = req.params;

            const {check_in, check_out} = req.body;

            const reservedApartment = await Booking.findOne({apartment_id});

            if (reservedApartment) {
                const {booking} = reservedApartment;

                booking.forEach(value => {
                    const startReservedDate = dayJs.unix(value.booking_start / 1000)
                        .format('DD MMM YYYY');

                    const endReservedDate = dayJs.unix(value.booking_end / 1000)
                        .format('DD MMM YYYY');

                    const isBetweenCheckIn = dayJs(check_in)
                        .isBetween(startReservedDate, endReservedDate, null, '[]');

                    const isBetweenCheckOut = dayJs(check_out)
                        .isBetween(startReservedDate, endReservedDate, null, '[]');

                    const isBetweenDateSt = dayJs(startReservedDate)
                        .isBetween(check_in, check_out, null, '[]');

                    const isBetweenDateEn = dayJs(endReservedDate)
                        .isBetween(check_in, check_out, null, '[]');

                    if (isBetweenCheckIn || isBetweenCheckOut || isBetweenDateSt || isBetweenDateEn) {
                        throw new ErrorHandler('Date is reserved',constants.BAD_REQUEST);
                    }
                });
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
