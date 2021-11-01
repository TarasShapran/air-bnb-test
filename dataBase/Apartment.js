const {Schema, model} = require('mongoose');

const {modelNamesEnum, apartmentTypeEnum} = require('../configs');

const apartment = new Schema({
    country: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    region: {
        type: String,
        required: true,
        trim: true
    },
    type_of_apartment: {
        type: String,
        enum: Object.values(apartmentTypeEnum)
    },
    number_of_rooms: {
        type: Number,
        required: true
    },
    number_of_beds: {
        type: Number,
        required: true
    },
    amount_of_places: {
        type: Number,
        required: true
    },
    star_rating: {
        type: Number
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    photo: {
        type: String
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model(modelNamesEnum.APARTMENT, apartment);
