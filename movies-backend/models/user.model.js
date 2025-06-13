const { required } = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide a username'],
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
        },
        movieCollection: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
