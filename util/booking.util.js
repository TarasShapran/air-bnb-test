const dayJs = require('dayjs');
const ErrorHandler = require('../errors/ErrorHandler');
const {constants} = require('../configs');
module.exports = {
    isDateNotReserved: (reservedApartments, check_in, check_out) => {
        reservedApartments.forEach((reservedApartment) => {
            if (reservedApartment) {
                const {booking_start, booking_end} = reservedApartment;

                const startReservedDate = dayJs.unix(booking_start / 1000)
                    .format('DD MMM YYYY');

                const endReservedDate = dayJs.unix(booking_end / 1000)
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
                    throw new ErrorHandler('Date is reserved', constants.BAD_REQUEST);
                }
            }
        });

    }
};
