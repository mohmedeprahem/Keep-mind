// moduels requirement
const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        rquired: [true, `please add name`],
        minLength: [1, `min 1 of name`],
        maxLength: [30, `max 30 of name`]
    },
    email: {
        type: String,
        required: [true, ` please add email`],
        lowercase: [true, `ivalid email`],
        trim: [true, `invalid email`],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, `please add password`]
    }
})

const User = module.exports = mongoose.model(`User`, userSchema);