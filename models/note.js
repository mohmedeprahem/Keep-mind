// moduels requirement
const mongoose = require(`mongoose`);

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 999
    },
    description: {
        type: String,
        maxLength: 10000
    }
})

const User = module.exports = mongoose.model(`Note`, noteSchema);