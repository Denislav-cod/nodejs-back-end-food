const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    cart: {
        type: Array
    },
    token: {
        type: String,
    }
})

module.exports = mongoose.model("Users", UserSchema);