const {Schema, model} = require('mongoose');

const {userRoles, modelNamesEnum} = require('../configs');
const passwordService = require('../service/password.service');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    age: {
        type: Number
    },
    avatar: {
        type: String
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    },

    async updateUserWithHashPassword(user, password) {
        const hashedPassword = await passwordService.hash(password);

        return this.findByIdAndUpdate({_id: user._id}, {password: hashedPassword}, {new: true});
    }
};

module.exports = model(modelNamesEnum.USER, userSchema);
