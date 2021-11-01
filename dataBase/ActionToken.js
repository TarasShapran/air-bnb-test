const {Schema, model} = require('mongoose');

const {actionTokenTypeEnum, modelNamesEnum} = require('../configs');

const actionTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    token_type: {
        type: String,
        required: true,
        enum: Object.values(actionTokenTypeEnum),
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {timestamps: true});

actionTokenSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model(modelNamesEnum.ACTION_TOKENS, actionTokenSchema);
