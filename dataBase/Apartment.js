const {Schema, model} = require('mongoose');

const {modelNamesEnum, apartmentTypeEnum} = require('../configs');

const apartmentSchema = new Schema({
    country: {
        type: String,
        required: true,
        trim: true
    },
    title:{
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
    type: {
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
    number_of_star: {
        type: Number
    },
    amount_of_places: {
        type: Number,
        required: true
    },
    star_rating: {
        type: Number,
        default:null
    },
    description: {
        type: String,
        required: true
    },
    approve: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    photo: [String],
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model(modelNamesEnum.APARTMENT, apartmentSchema);
