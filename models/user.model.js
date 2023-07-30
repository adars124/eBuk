const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['admin', 'normal'],
        default: 'normal'
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
});

const User = model('User', userSchema);

module.exports = User;