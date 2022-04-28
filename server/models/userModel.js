const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
    fullname:{type: String,max:20,min:4,required: true},
    username: {type: String, max:20, min:4,required:true},
    email: {type:String, required:true},
    password: {type: String, min: 7, max: 20 ,required: true},
    followers: {type: Object,required:true,default:{}},
    following: {type: Object,required:true, default:{}},
    verified:{type:Boolean,default:false,required:true},
    verificationCode: {type: String, required:true}
})

UsersSchema.index({fullname:'text', username: "text"})
module.exports.UsersSchema  = mongoose.model('users',UsersSchema)