const {Schema, model} = require('mongoose');

const {modelNamesEnum} = require('../configs');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

}, {timestamps: true});

oAuthSchema.pre('findOne', function() {
    this.populate('user_id');
});

oAuthSchema.pre('find', function() {
    this.populate('user_id');
});

module.exports = model(modelNamesEnum.O_AUTH, oAuthSchema);
