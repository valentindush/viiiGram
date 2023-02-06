const jwt = require('jsonwebtoken')
const {UsersSchema} = require("../models/userModel")
const {PostSchema} = require("../models/postsModel");
const multer = require('multer');
const { default: mongoose } = require('mongoose');


//File uploading



module.exports.newPost = async(req,res,next)=>{

    try {

        let fileName = ""

        const storage = multer.diskStorage({
            destination: "uploads/posts",
            filename: (req,file,cb)=>{
                const Splitted = file.originalname.split('.')
                const ext = Splitted[Splitted.length - 1]
                fileName = `viigram_img_${Date.now()}_${Math.random()*1000000}.${ext}`
                cb(null, fileName)
            }
        })

        const upload = multer({
            storage: storage,
            fileFilter: async (re, file, cb) => {
                const nameSplitted = file.originalname.split('.')
                const ext = nameSplitted[nameSplitted.length - 1]
                console.log(ext)

                if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "webp" || ext === "gif") {

                    cb(null, true)
                } else {
                    cb(new Error("Ony images are allowed"))
                }
            }

        }).single('image')

        upload(req,res,async (err) => {
            if (err) return res.status(500).json({msg: "error", code: 500, status: false})


            const token = req.body.token
            const description = req.body.desc

            const jwtData = jwt.verify(token, process.env.JWT_KEY)

            if (jwtData) {
                const userData = await UsersSchema.findOne({username: jwtData.username})

                if (userData) {
                    const new_post = PostSchema({
                        owner: userData.username,
                        postedAt: Date.now(),
                        description: description,
                        fileUrl: req.file.filename,
                        likes: [],
                        comments: []
                    })

                    if (await new_post.save()) {
                        console.log(new_post)
                        return res.json({msg: "saved", code: 200, status: true})
                    } else {
                        return res.json({msg: " failed", status: false})
                    }
                } else {
                    return res.json({msg: " failed", status: false})
                }
            } else {
                return res.json({msg: " failed", status: false})
            }


        })


    } catch (err) {
        next(err)
    }
}

module.exports.getTopPosts = async (req,res,next)=>{
    try{
        const token = req.body.token
        if(!token) return res.status(403)
        const userData = jwt.verify(token, process.env.JWT_KEY)
        if(!userData) return res.status(403)

        const topPosts = PostSchema.find().sort({likes: 1}).limit(20)
        if(topPosts) return  res.json({msg: "", code: 200, status: true, topPosts: topPosts})
        if(!topPosts) return  res.status(500)
    }catch (e) {
        next(e)
    }
}

module.exports.getPosts = async(req,res,next)=>{
    try{
        const token = req.body.token
        const jwtData = jwt.verify(token, process.env.JWT_KEY)

        if(!jwtData) return res.status(403).json({msg: "BAD REQUEST", code: 403, status: false})

        if(jwtData){
            const posts = await PostSchema.find().sort({_id: -1})

            return  res.json({msg: "success", code: 200,status: true, posts: posts})
        }

    }catch (e) {
        next(e)
    }
}

module.exports.like = async (req,res,next)=>{

    try{
        const token = req.body.token
        const postId = req.body.postId

        const jwtData = jwt.verify(token, process.env.JWT_KEY)
        if(!jwtData) return res.status(402)

        const post = await PostSchema.findOne({_id:postId})
        if(!post) return res.status(404)
        const user = await  UsersSchema.findOne({username: jwtData.username})
        try {
            await PostSchema.updateOne({_id: postId}, {$addToSet: {likes: user._id}})
            return res.json({msg:"Posted LIKED !"})           
        } catch (err) {
            return res.status(5000)
        }

       


    }catch (e) {
        next(e)
    }
}

module.exports.unlike = async (req,res,next)=>{
    try{

        const token = req.body.token
        const postId = req.body.postId

        const jwtData = jwt.verify(token, process.env.JWT_KEY)
        if(!jwtData) return res.status(402)
        const user = await  UsersSchema.findOne({username: jwtData.username})
        const post = await PostSchema.findOne({_id: postId})

        if(!post) return res.status(404)

        try {
            const updatePost = await PostSchema.updateOne({_id: postId}, {$pull: {likes: user.username}})
            return res.json({msg:"unliked!"})
        } catch (err) {
            return res.status(500)
        }

    }catch (e) {
        next(e)
    }
}

module.exports.addComment = async(req,res,next)=>{
    try {

        const {token,comment,postId} = req.body
        if(!token,comment,postId) return res.status(402)
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        if(!decoded) return res.status(402)
        if(comment === "") return res.status(402)

        const post = PostSchema.findById(postId)
        if(!post) return res.status(404)

        try {
            const addComment = await PostSchema.updateOne({_id:postId},{$addToSet:{comments:{by:decoded._id,comment:comment,id:Date.now()}}})
            return res.json({msg:"comment added !"})
        } catch (err) {
            return res.status(500)
        }

    } catch (err) {
        next(err)
    }
}

module.exports.deleteComment = async (req,res,next)=>{
    try {
        
        const {token,postId,commentId} = req.body

        if(!postId||commentId||token) return res.status(402)
        const decoded  = jwt.decode(token,process.env.JWT_KEY)
        if(!decoded) return res.status(402)

        const post = PostSchema.findById(postId)
        if(!post) return res.status(404)

        try {
            const dlComment = await PostSchema.updateOne({_id:postId},{$pull: {comments: {by:decoded._id,id:commentId}}})
            return res.json({msg:"Comment deleted"})
        } catch (err) {
            return res.status(500)
        }

    } catch (err) {
        next(err)
    }
}