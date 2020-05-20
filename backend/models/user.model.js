const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true, // Will create fields for when it was created and modified
});

const User = mongoose.model('User', userSchema);

module.exports = User;