const dayJs = require('dayjs');

const {constants} = require('../configs');
const {Booking} = require('../dataBase');

module.exports = {
    createBooking: async (req, res, next) => {
        try {
            const {user_id, apartment_id} = req.params;
            const {check_in, check_out} = req.body;

            const booking_start = dayJs(check_in, 'YYYY-MM-DD').valueOf();
            const booking_end = dayJs(check_out, 'YYYY-MM-DD').valueOf();

            let booking = await Booking.findOne({apartment_id});

            if (!booking){
                booking = await Booking.create({user_id, apartment_id, booking: {booking_start, booking_end}});

            }else{
                booking= await Booking.updateOne({apartment_id},{$push :{booking: {booking_start, booking_end}}},{new:true});
            }

            res.json(booking)
                .status(constants.CREATED);
        } catch (e) {
            next(e);
        }
    },
};