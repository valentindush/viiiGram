const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
    fullName:{type: String,max:20,min:4,required: true},
    username: {type: String, max:20, min:4,required:true},
    email: {type:String, required:true},
    followers: {type: Object,required:true,default:{}},
    following: {type: Object,required:true, default:{}},
    verified:{type:Boolean,default:false,required:true},
    verificationCode: {type: String, required:true}
})
module.exports.UsersSchema  = mongoose.model('users',UsersSchema)