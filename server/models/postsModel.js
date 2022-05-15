const mongoose = require('mongoose')


const PostsSchema  = new mongoose.Schema({

    owner: {
        type: String,
        required: true,
        
    },
    description:{
        type: String,
        default: ""
    },
    postedAt:{
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    likes:{
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
})

module.exports.PostSchema = mongoose.model("posts", PostsSchema)