const mongoose = require('mongoose')

const MessageModel = new mongoose.Schema({
    msg: {
        type:String,
        required: true
    },
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true
    },
    people: {
        type: Array,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})
module.exports.MessageSchema = mongoose.model('messages',MessageModel)