const jwt = require('jsonwebtoken')
const {UsersSchema} = require("../models/userModel")
const {PostSchema} = require("../models/postsModel");
const multer = require('multer')


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
                    console.log("name ::: " + fileName)
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
        if(jwtData){
            const user = await  UsersSchema.findOne({username: jwtData.username})

            if(user){
                const post = await PostSchema.findOne({_id: postId})
                if(post){
                    const updatePost = await PostSchema.updateOne({_id: postId}, {$addToSet: {likes: user.username}})
                    if(updatePost){
                        return  res.json({msg: "liked", code: 200, status: true})
                    }else{
                        return res.status(500)
                    }
                }
            }
        }else{
            return res.json({msg: "BAD REQUEST", code: 403, status: false})
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
        if(jwtData){
            const user = await  UsersSchema.findOne({username: jwtData.username})

            if(user){
                const post = await PostSchema.findOne({_id: postId})
                if(post){
                    const updatePost = await PostSchema.updateOne({_id: postId}, {$pull: {likes: user.username}})
                    if(updatePost){
                        return  res.json({msg: "unliked", code: 200, status: true})
                    }else{
                        return res.status(500)
                    }
                }
            }
        }else{
            return res.json({msg: "BAD REQUEST", code: 403, status: false})
        }

    }catch (e) {
        next(e)
    }
}