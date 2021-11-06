const {Schema, model} = require('mongoose');

const {modelNamesEnum} = require('../configs');

const bookingSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNamesEnum.USER
    },
    apartment_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNamesEnum.APARTMENT
    },
    booking_start: {
        type: String,
        required: true,
    },
    booking_end: {
        type: String,
        required: true,
    },
    price: {
        type: Number
    }
}, {timestamps: true});

/*bookingSchema.pre('findOne', function() {
    this.populate('user_id', 'apartment_id');
});

bookingSchema.pre('find', function() {
    this.populate('user_id', 'apartment_id');
});*/

module.exports = model(modelNamesEnum.BOOKING, bookingSchema);
