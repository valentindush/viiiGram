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
    reciver: {
        type: String,
        required: true
    }
})
module.exports.MessageSchema = mongoose.model('messages',MessageModel)