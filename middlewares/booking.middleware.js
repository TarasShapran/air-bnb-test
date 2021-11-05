const dayJs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');

dayJs.extend(isBetween);


const {Booking} = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isBookingDateFree: async (req, res, next) => {
        try {
            const {apartment_id} = req.params;

            const {check_in, check_out} = req.body;

            const qqq = await Booking.findOne({apartment_id});

            if (qqq) {
                const {booking} = qqq;

                booking.forEach(value => {
                    const dateSt = dayJs.unix(value.booking_start / 1000)
                        .format('DD MMM YYYY');

                    const dateEn = dayJs.unix(value.booking_end / 1000)
                        .format('DD MMM YYYY');

                    const isBetweenCheckIn = dayJs(check_in)
                        .isBetween(dateSt, dateEn, null, '[]');

                    const isBetweenCheckOut = dayJs(check_out)
                        .isBetween(dateSt, dateEn, null, '[]');

                    const isBetweenDateSt = dayJs(dateSt)
                        .isBetween(check_in, check_out, null, '[]');

                    const isBetweenDateEn = dayJs(dateEn)
                        .isBetween(check_in, check_out, null, '[]');

                    if (isBetweenCheckIn || isBetweenCheckOut || isBetweenDateSt || isBetweenDateEn) {
                        throw new ErrorHandler('Date is reserved',404);
                    }

                });
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
